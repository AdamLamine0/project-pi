import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { EventMapMarker } from '../../../models/event';

// Fix Leaflet default marker icon paths broken by webpack bundling
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

@Component({
  selector: 'app-map',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="map-shell">
      @if (!markers || markers.length === 0) {
        <div class="map-empty-overlay">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8aaace" stroke-width="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <p>No in-person events found</p>
        </div>
      }
      <div [id]="mapId" class="map-container"></div>
    </div>
  `,
  styles: [`
    .map-shell { position: relative; width: 100%; height: 100%; min-height: 400px; }
    .map-container { width: 100%; height: 100%; min-height: 400px; border-radius: 12px; z-index: 0; }
    .map-empty-overlay {
      position: absolute; inset: 0; z-index: 10;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 12px; background: rgba(248,250,255,0.92); border-radius: 12px;
      color: #8aaace; font-size: 13px; font-weight: 500; pointer-events: none;
    }
  `],
})
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() markers: EventMapMarker[] = [];
  @Input() draggable = false;
  @Input() onDrag?: (lat: number, lng: number) => void;

  protected readonly mapId = `map-${Math.random().toString(36).slice(2)}`;

  private map: L.Map | null = null;
  private markerLayer: L.LayerGroup | null = null;

  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markers'] && this.map) {
      this.refreshMarkers();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
    this.map = null;
  }

  private initMap(): void {
    const el = document.getElementById(this.mapId);
    if (!el || this.map) return;

    this.map = L.map(el, { zoomControl: true, scrollWheelZoom: true })
      .setView([34, 9], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(this.map);

    this.markerLayer = L.layerGroup().addTo(this.map);
    this.refreshMarkers();
    setTimeout(() => this.map?.invalidateSize(), 300);
  }

  private refreshMarkers(): void {
    this.markerLayer?.clearLayers();
    if (!this.markers?.length || !this.markerLayer) return;

    const bounds: L.LatLngTuple[] = [];

    for (const m of this.markers) {
      const latlng: L.LatLngTuple = [m.latitude, m.longitude];
      bounds.push(latlng);

      const marker = L.marker(latlng, { draggable: this.draggable });

      if (this.draggable && this.onDrag) {
        const cb = this.onDrag;
        marker.on('dragend', (e: L.LeafletEvent) => {
          const pos = (e as L.DragEndEvent).target.getLatLng();
          cb(pos.lat, pos.lng);
        });
      }

      const date = m.startDate
        ? new Date(m.startDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
        : '';

      const popup = `
        <div style="font-family:system-ui,sans-serif; min-width:200px;">
          ${m.coverImage ? `<img src="${m.coverImage}" style="width:100%;height:100px;object-fit:cover;border-radius:6px;margin-bottom:8px;" alt="" />` : ''}
          <span style="font-size:11px;font-weight:600;background:#eff6ff;color:#1d4ed8;padding:2px 7px;border-radius:4px;">${m.type}</span>
          <p style="font-size:13px;font-weight:700;margin:6px 0 2px;color:#1e293b;">${m.title}</p>
          ${date ? `<p style="font-size:11px;color:#64748b;margin:0 0 2px;">${date}</p>` : ''}
          ${m.address ? `<p style="font-size:11px;color:#64748b;margin:0 0 8px;">${m.address}</p>` : ''}
          <button onclick="window.__mapNav('${m.id}')"
            style="width:100%;background:#1C4FC3;color:#fff;border:none;padding:6px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;">
            View Event
          </button>
        </div>`;

      marker.bindPopup(popup);
      this.markerLayer.addLayer(marker);
    }

    if (bounds.length === 1) {
      this.map?.setView(bounds[0], 13);
    } else if (bounds.length > 1) {
      this.map?.fitBounds(bounds, { padding: [40, 40] });
    }

    // Register global navigation callback used in popup button
    (window as any).__mapNav = (id: string) => {
      this.router.navigate(['/events'], { queryParams: { open: id } });
    };
  }
}
