# OceanGuard 15-Screen High Fidelity Alpha Prototype

This prototype is for HCI Assignment 2, SDG 14: Life Below Water. OceanGuard is a mobile/web application for a local marine conservation organisation in Malaysia. It helps users report marine waste, identify waste using AI, view pollution hotspot data, join cleanup events, and track community impact.

## How to Run

Open `index.html` directly in a browser. No backend, database, or installation is required.

## Prototype Scope

- Version: high fidelity alpha prototype
- Layout: 390px x 844px mobile app frame
- Technology: HTML, CSS, JavaScript
- Backend: none, all API features are simulated with comments and UI feedback
- Screens: 15 UI-UX screens, including login and registration

## 15 UI-UX Screens

| No. | Screen | Purpose |
| --- | --- | --- |
| 1 | Welcome | Entry screen for OceanGuard and demo access |
| 2 | Login | Existing volunteer login |
| 3 | Register | New volunteer account creation |
| 4 | Home Dashboard | Main smart waste reporting dashboard |
| 5 | Capture Waste Photo | Camera API and GPS report entry |
| 6 | Report Details | Waste type, severity, and notes form |
| 7 | Upload Status | Cloud upload progress and success feedback |
| 8 | AI Waste Identification | AI scan animation and recognition result |
| 9 | Manual Category Confirmation | Manual correction for low confidence results |
| 10 | Pollution Heatmap | Map/heatmap visual for hotspot data |
| 11 | Hotspot Detail | Local hotspot report breakdown |
| 12 | Cleanup Events | Event list for local conservation activities |
| 13 | Event Detail and Reminder | Cleanup details and reminder sound |
| 14 | Community Impact | Reports, waste removed, and volunteer progress |
| 15 | Volunteer Profile | Account, notification, and privacy preferences |

## API / Technology Mapping

| API / Technology | Prototype Function | OceanGuard Application |
| --- | --- | --- |
| Web Speech API | AI voice guide | Speaks AI result guidance |
| Web Audio API | Success, warning, confirmation, and reminder sounds | Gives audio feedback |

## Visual and Audio Techniques

The prototype uses ocean-themed colours, rounded cards, smooth screen transitions, progress bars, map markers, a heatmap visual, AI scanning animation, and mobile bottom navigation. Audio techniques include success sounds for capture and upload, warning sounds for manual confirmation, event reminder sounds, and a Web Speech API voice guide.

## User Experience Connection

The interface supports usability by making system status visible through progress bars and success messages. It reduces user errors through manual category confirmation when AI confidence may be low. It supports accessibility through voice guidance and audio feedback. It also connects individual waste reports to larger community conservation outcomes through hotspot detail, cleanup events, and impact tracking.
