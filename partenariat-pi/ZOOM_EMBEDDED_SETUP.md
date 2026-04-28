# Embedded Zoom Meeting Setup Guide

## Overview

This guide explains how to embed Zoom meetings inside your platform using Zoom Meeting SDK Component View.

---

## Prerequisites

### 1. Get Zoom Meeting SDK Credentials

- Go to [Zoom Marketplace](https://marketplace.zoom.us/)
- Click **Develop** → **Build your app**
- Create a new app, choose **Meeting SDK** (NOT OAuth or JWT)
- Copy your `SDK Key` and `SDK Secret`

### 2. Backend Setup

#### Add Credentials to `.env`

```dotenv
ZOOM_SDK_KEY=your_sdk_key_here
ZOOM_SDK_SECRET=your_sdk_secret_here
```

#### Restart Backend

```powershell
Set-Location "C:\Users\adamo\IdeaProjects\project-pi\partenariat-pi"
.\mvnw.cmd spring-boot:run
```

Test signature endpoint:

```powershell
$body = @{
  meetingNumber = "12345678901"
  role = 0
} | ConvertTo-Json

Invoke-RestMethod -Method Post `
  -Uri "http://localhost:8082/api/zoom/signature" `
  -Headers @{ "X-User-Role"="ROLE_USER"; "X-User-Id"="1"; "Content-Type"="application/json" } `
  -Body $body
```

Expected response:

```json
{
  "signature": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "sdkKey": ""
}
```

### 3. Frontend Setup (Angular)

#### Install Zoom SDK

```bash
npm install @zoom/meetingsdk --save
```

#### Add to `index.html`

```html
<meta charset="UTF-8" />

<!-- Add before </body> -->
<script src="https://source.zoom.us/5.16.9/lib/vendor/react.min.js"></script>
<script src="https://source.zoom.us/5.16.9/lib/vendor/react-dom.min.js"></script>
<script src="https://source.zoom.us/5.16.9/lib/vendor/redux.min.js"></script>
<script src="https://source.zoom.us/5.16.9/lib/vendor/redux-thunk.min.js"></script>
<script src="https://source.zoom.us/5.16.9/lib/vendor/lodash.min.js"></script>
<script src="https://source.zoom.us/zoom-meeting-embedded-5.16.9.min.js"></script>
```

**Note**: Replace `5.16.9` with the latest version from [Zoom CDN releases](https://source.zoom.us/).

#### Use Join Component

```typescript
import { JoinZoomMeetingComponent } from './components/join-zoom-meeting/join-zoom-meeting.component';

// In your routing module or route config
{
  path: 'meeting/join',
  component: JoinZoomMeetingComponent
}
```

#### Navigate to Meeting

From your meeting request success page:

```typescript
// After successful meeting request, user sees Zoom meeting ID
this.router.navigate(['/meeting/join'], {
  queryParams: {
    meetingNumber: response.zoomMeetingId,
    password: response.zoomPassword,
    userName: this.auth.getUserName(),
    userEmail: this.auth.getUserEmail()
  }
});
```

---

## How It Works

1. **User submits meeting request** (already implemented) ✅
2. **Backend creates Zoom meeting** (already implemented) ✅
3. **Backend sends notification email to partner** (already implemented) ✅
4. **User navigates to `/meeting/join?meetingNumber=...`**
5. **Frontend calls `/api/zoom/signature` endpoint** (new)
6. **Backend generates JWT signature** (new)
7. **Frontend initializes Zoom SDK in embedded mode**
8. **Zoom meeting opens inside your app** (in-app experience)

---

## API Reference

### POST `/api/zoom/signature`

Generate JWT signature for joining a meeting.

**Headers:**
- `X-User-Role: ROLE_USER | ROLE_ADMIN`
- `X-User-Id: <user-id>`

**Request Body:**
```json
{
  "meetingNumber": "12345678901",
  "role": 0
}
```

- `role`: 0 = participant (default), 1 = host

**Response:**
```json
{
  "signature": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "sdkKey": ""
}
```

---

## Security Notes

- **Never expose `ZOOM_SDK_SECRET` in frontend** — it's backend-only
- **Signature is valid for 1 hour** — request fresh signature for each join
- **Role 1 (host) requires `zak` token** — not needed for participants
- **Meeting password is returned in meeting creation response** — pass it safely to frontend

---

## Troubleshooting

### "Zoom SDK not loaded"

Ensure all Zoom CDN scripts are loaded in `index.html` before component initializes.

### "Failed to join meeting"

- Check meeting number is correct
- Verify signature is valid and not expired
- Ensure password (if required) is correct

### Performance Issues

Run Zoom initialization outside Angular zone (already done in component):

```typescript
this.ngZone.runOutsideAngular(() => {
  this.client.init({...})
})
```

---

## Next Steps

1. Update API Gateway config to include `/api/zoom/**` route (add Bean in `GatewayRoutes.java`)
2. Add `ZOOM_SDK_KEY` and `ZOOM_SDK_SECRET` to backend `.env`
3. Install Zoom SDK via npm in frontend
4. Update routing to point to `JoinZoomMeetingComponent`
5. Test end-to-end: request meeting → see email → click link → join in-app

---

## Resources

- [Zoom Meeting SDK Documentation](https://developers.zoom.us/docs/meeting-sdk/web/)
- [Component View Examples](https://github.com/zoom/sample-app-web)
- [JWT Signature Reference](https://developers.zoom.us/docs/meeting-sdk/auth/)

