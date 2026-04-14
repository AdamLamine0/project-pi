import { PaymentStatus, RegistrationStatus } from './registration';
import { LocationType } from './event';

export interface Ticket {
  ticketNumber: string;
  registrationId: number;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  eventEndDate: string | null;
  eventLocation: string | null;
  locationType: LocationType;
  userId: number;
  ticketPrice: number | null;
  paymentStatus: PaymentStatus;
  registrationStatus: RegistrationStatus;
  registeredAt: string;
  downloadUrl: string;
}
