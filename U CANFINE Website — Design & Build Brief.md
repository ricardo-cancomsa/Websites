# U CANFINE Website — Design & Build Brief

Nov 26, 2026 · @Ricardo

## 1. Brief for the AI build agent

Build a small, static, mobile-first website at **ucanfine.com** with four live pages: Home, Privacy Policy, Terms and Conditions, and Account Deletion. All copy is in sections 5–8 of this document; use it verbatim, replacing only the `[SQUARE BRACKET]` placeholders once section 9 is answered.

The legal pages are not optional extras. The app already links to Terms of Use, Privacy Policy and Disclaimer, and those links failed in testing (bug list BUG-002, issue 5), so these URLs must be live and stable before the next app build ships. Apple and Google also require a public privacy-policy URL, and Google Play requires a web page where users can request account deletion.

Rules for the agent:

1. Do not invent facts, statistics, reward amounts, partner names or legal entity details. If a placeholder is unanswered, leave it visibly bracketed and report it.
2. Do not reword the Privacy Policy or Terms and Conditions. Layout and headings may be styled; wording may not change.
3. No analytics, tracking pixels or third-party cookies in v1, so no cookie banner is needed. If analytics are added later, the Privacy Policy and a consent banner must be updated first.
4. Every legal page shows its version number and "Last updated" date at the top.
5. Deliver: source code, a deployed preview URL, and a list of any unresolved placeholders.

The legal texts are a working draft prepared from the product documents. They must be reviewed by an attorney before go-live (see section 9).

## 2. Site map and technical requirements

Four pages plus one redirect. The URLs are fixed because the app will hard-link to them.

| Page | URL | Linked from | Notes |
| --- | --- | --- | --- |
| Home | `/` | — | Single scrolling page with anchors `#how-it-works`, `#safety`, `#faq`, `#contact` |
| Privacy Policy | `/privacy-policy` | App registration, daily acceptance modal, store listings | Text in section 7 |
| Terms and Conditions | `/terms` | App registration, daily acceptance modal | Text in section 8; includes `#disclaimer` anchor |
| Disclaimer | `/disclaimer` | App (existing link) | 301 redirect to `/terms#disclaimer` |
| Account Deletion | `/delete-account` | Google Play listing, Privacy Policy | Text in section 6 |

**Build**

- Static HTML and CSS, minimal vanilla JS (mobile menu and FAQ accordion only). No framework required; Astro or Eleventy is acceptable if the output is static.
- Mobile-first, readable from 320 px wide. Legal pages must also render cleanly inside the app's in-app browser (no fixed overlays, no pop-ups).
- HTTPS only, with HSTS. Host on any static host with a free TLS certificate (Azure Static Web Apps fits the existing estate).
- Performance: each page under 500 KB, Lighthouse score 90+ for performance and accessibility.
- Accessibility: WCAG 2.1 AA contrast, semantic headings, alt text on every image, visible focus states.
- SEO: unique `<title>` and meta description per page, Open Graph tags, `sitemap.xml`, `robots.txt`.
- Legal pages: a sticky "On this page" contents list on desktop, collapsible on mobile; numbered headings with anchor links so support staff can link to a clause.
- Contact form, if built: name, email, subject, message only. Send to the support inbox; do not store submissions on the website. Otherwise use `mailto:` links.

**Header:** logo (left), links Home · How it works · FAQ · Contact, "Get the app" button (right).

**Footer (every page):** logo, links to Privacy Policy, Terms and Conditions, Account Deletion, Contact; app-store badges; the company disclosure line `[REGISTERED COMPANY NAME] (Reg. no. [NUMBER]) · [PHYSICAL ADDRESS] · [PHONE] · info@ucanfine.com`; "Patent pending: ZA 2023/04569, PCT/ZA2024/050016"; "© 2026 U CANFINE. All rights reserved." The company line is required by section 43 of the Electronic Communications and Transactions Act.

## 3. Brand and visual design

The look is serious and civic, not playful: a road-safety service that handles evidence and pays people. Navy and road-sign amber carry the brand; status colours match the app's submission states. If the app's own colours differ, the app wins and the agent should take hex values from the app build.

**Colour palette (proposed)**

| Token | Hex | Use |
| --- | --- | --- |
| `--navy` | `#0B1F3A` | Header, footer, headings, primary text on light backgrounds |
| `--amber` | `#FFB400` | Primary buttons, highlights, logo accent (road-sign yellow) |
| `--white` | `#FFFFFF` | Page background |
| `--mist` | `#F3F5F8` | Alternate section background, cards |
| `--slate` | `#5B6B7F` | Secondary text, captions |
| `--green` | `#1E9E5A` | "Accepted" status, success messages |
| `--red` | `#D64545` | "Declined" status, errors |
| `--blue` | `#2F6FDE` | Links, "Under Review" status |

Amber buttons take navy text (white on amber fails contrast). Provide a dark-mode set by swapping `--white`/`--navy` backgrounds and keeping amber.

**Typography**

- Headings: Montserrat 700 (Google Fonts), fallback `system-ui, sans-serif`.
- Body: Inter 400/600, fallback `system-ui, sans-serif`. Body 17 px, line height 1.6; legal pages 16 px with max line length 75 characters.
- Name styling: always **U CANFINE** in headings and legal text (capitals, one space). The app store name may read "UCANFINE"; do not mix styles on one page.

**Imagery**

- Real phone mock-ups of the app (Quick Capture, Create Offence, Dashboard) are the main visuals.
- Photography: South African roads, minibus taxis and urban intersections, shot from a pedestrian or passenger point of view. No identifiable faces or legible number plates in marketing images.
- Never show anyone using a phone while driving. If a car interior is shown, the phone sits in a dashboard cradle.
- Icons: one outline set (Lucide or Phosphor), 2 px stroke, navy or amber.

**Tone of copy:** plain, direct, civic. "You" for the user. No hype words, no guaranteed-earnings language.

## 4. Asset list

No image files exist in the project folder yet, so most assets must be exported from the app build or supplied by the team. The agent builds with the interim logo below and labelled placeholders, then swaps in finals.

| Asset | Spec | Source | Used on |
| --- | --- | --- | --- |
| Logo, full colour | SVG + PNG at 2x, transparent | App splash screen / designer | Header, footer |
| Logo, white (reversed) | SVG | Designer | Navy footer, hero |
| App icon | 1024 × 1024 PNG | App build (store icon) | Hero, "Get the app" section |
| Favicon set | `favicon.ico` 32 px, `icon.svg`, `apple-touch-icon.png` 180 px | Generated from app icon | All pages |
| Open Graph image | 1200 × 630 PNG, logo + tagline on navy | Agent generates | Social link previews |
| Screenshot: Quick Capture | Phone mock-up, 1290 × 2796 PNG | Current app build | Home, step 1 |
| Screenshot: Create Offence (offence type list) | As above | Current app build | Home, step 2 |
| Screenshot: Dashboard (Submitted / Under Review / Accepted / Declined) | As above, test data only | Current app build | Home, step 3 |
| Screenshot: Car Mode / Dashcam | As above | Current app build | Home, safety section |
| Hero photo | 2400 px wide WebP, under 250 KB | Licensed stock (SA street scene) | Home hero |
| App Store badge | Official "Download on the App Store" SVG | Apple Marketing Resources | Header, footer, home |
| Google Play badge | Official "Get it on Google Play" PNG/SVG | Google Play badge generator | Header, footer, home |
| Icons | Lucide: `camera`, `send`, `shield-check`, `scale`, `wallet`, `car`, `user-check`, `lock` | lucide.dev (ISC licence) | Home sections |

Screenshots must show test data only: no real ID numbers, faces or number plates. Until store listings are live, badges link to `#contact` with the label "Coming soon".

**Interim wordmark** (use until the official logo is supplied):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 48" role="img" aria-label="U CANFINE">
  <rect x="0" y="4" width="40" height="40" rx="9" fill="#FFB400"/>
  <path d="M12 14v11a8 8 0 0 0 16 0V14" fill="none" stroke="#0B1F3A" stroke-width="4.5" stroke-linecap="round"/>
  <text x="52" y="33" font-family="Montserrat, system-ui, sans-serif" font-weight="700" font-size="24" fill="#0B1F3A" letter-spacing="1">U CANFINE</text>
</svg>
```

For the reversed version, change the text fill to `#FFFFFF`.

## 5. Page copy: Home (`/`)

Use the copy below as written. Section labels in *italics* are for the agent and are not displayed.

*Hero (navy background, phone mock-up of Quick Capture on the right)*

> **Change driver behaviour. Save lives.**
>
> U CANFINE lets vetted South Africans capture traffic offences and crimes on their phones and send the evidence straight to qualified traffic officers. When your evidence leads to a fine, you get paid.
>
> &#91;Get the app\]  \[How it works\]

*Problem strip (three stat cards on mist background)*

> **More than 11 000 people** died on South African roads in 2025.
>
> **About R205 billion** is what road crashes cost the country each year.
>
> **Too few officers** are on the road to enforce the rules.
>
> Road safety is a shared responsibility. U CANFINE puts more eyes on the road, without more cameras on poles.

*How it works — `#how-it-works` (three columns, one screenshot each)*

> **1. Capture.** See an offence, open the app and take a photo or video. Evidence can only be captured inside the app, and every file is stamped with the date, time and GPS location and encrypted on the spot.
>
> **2. Submit.** Choose the offence type from the list, confirm the vehicle registration and submit. You can follow every submission on your dashboard: Submitted, Under Review, Accepted or Declined.
>
> **3. Adjudicate and issue.** Qualified traffic officers at the U CANFINE Adjudication Centre review your evidence. If it is accepted, the infringement notice is sent to the offender through the relevant authority. Crimes are referred to SAPS.

*Who can join (mist background, icon `user-check`)*

> **Every member is vetted.** To keep the evidence trustworthy, each user is verified before they can submit: South African ID, a live selfie, proof of address, and background checks including credit and criminal record. Only approved phone makes and models can be used, so picture and video quality stands up to review.
>
> You must be 18 or older and a South African resident.

*Safety — `#safety` (icon `car`, Car Mode screenshot)*

> **Never use your phone while driving.** If you are driving, U CANFINE only works with your phone in a certified dashboard cradle and the app in Car Mode. Car Mode records continuously in a short loop, so one tap saves what just happened.
>
> **Never put yourself at risk.** Do not confront, follow or approach anyone. Capture only what you can safely see from where you are.
>
> **Built for court.** Original, unedited files, a recorded chain of custody, and the date, time and location on every capture. If you are subpoenaed to give evidence, \[U CANFINE's legal team will support you at no cost\].

*Rewards (icon `wallet`)*

> **Get paid when your evidence counts.** You earn a reward for each submission that is accepted and results in a fine being \[issued / paid\]. Declined submissions earn nothing. Reward amounts are shown in the app. U CANFINE does not handle speeding offences.

*FAQ — `#faq` (accordion)*

> **Is U CANFINE free?** Yes, the app is free to download and use. \[Optional paid add-on: an emergency reaction-unit service.\]
>
> **What can I report?** Traffic offences such as red-light violations, illegal overtaking, using a phone while driving, and stopping in prohibited zones, plus criminal incidents. Speeding is not handled through the app.
>
> **Can I upload photos from my gallery?** No. To protect the integrity of the evidence, everything must be captured inside the app.
>
> **Will the offender know who reported them?** Your identity is not shared with the offender. It is only disclosed to the authorities, or to a court if you are required to give evidence.
>
> **Why do I accept the Terms every day?** You confirm each day that you will use the app safely and lawfully, including not using it while driving unless your phone is cradled and in Car Mode.
>
> **What happens if I break the rules?** False, edited or unsafe submissions lead to suspension for at least six months, and may be reported to the authorities.
>
> **How do I delete my account?** See Account Deletion.

*Contact — `#contact`*

> **Get in touch.** General: info@ucanfine.com · Support: support@ucanfine.com · Privacy: privacy@ucanfine.com · Partnerships and authorities: \[NAME\], \[EMAIL\], \[PHONE\].

## 6. Page copy: Account Deletion (`/delete-account`)

Google Play requires this page. Contact details live on the Home page (`#contact`), so no separate contact page is needed.

> **Delete your U CANFINE account**
>
> You can ask us to delete your account and personal information at any time.
>
> **In the app:** Account → Settings → Delete account. \[Confirm the path once the feature is built.\]
>
> **By email:** send "Delete my account" from your registered email address to privacy@ucanfine.com, with your full name and registered mobile number. We will verify your identity before acting and confirm within 30 days.
>
> **What we delete:** your profile, login details, selfie and verification documents, banking details, device identifiers and notification settings.
>
> **What we must keep, and for how long:** evidence you submitted and the records linked to it (submission details, adjudication outcome, reward payments) form part of legal proceedings. We keep these for as long as the law requires or until any related case is finalised, \[and for no more than X years\]. Payment records are kept for five years for tax purposes. Kept records are restricted and used for no other purpose.
>
> **Rewards owed:** any reward already earned is paid out before your account is closed. Submissions still under review when you delete your account are withdrawn and earn no reward \[confirm\].
>
> Questions? Read our Privacy Policy or email privacy@ucanfine.com.

## 7. Privacy Policy (`/privacy-policy`)

Draft written to the Protection of Personal Information Act 4 of 2013 (POPIA). Publish everything below this line.

---

# U CANFINE Privacy Policy

Version 1.0 · Last updated: \[DATE\]

### 1. Who we are

U CANFINE is operated by \[REGISTERED COMPANY NAME\] (registration number \[NUMBER\]), \[PHYSICAL ADDRESS\], South Africa ("U CANFINE", "we", "us"). We are the responsible party for the personal information described in this policy.

Our Information Officer is \[NAME\], privacy@ucanfine.com, \[PHONE\].

This policy applies to the U CANFINE mobile app, the website ucanfine.com and the U CANFINE Adjudication Centre. It covers two groups of people: **users** who register and submit evidence, and **people who appear in evidence**, such as drivers, vehicle owners and bystanders.

### 2. Information we collect from users

- **Identity and contact:** full name, South African ID number, date of birth, email address, mobile number and residential address.
- **Verification:** copies of your ID document and proof of address, a live selfie taken at registration and at login, and the results of background checks, including credit, criminal record and address verification.
- **Account:** username, password (stored encrypted), daily acceptance of our Terms and Conditions, and account status.
- **Payment:** banking details for paying rewards, payment history and tax information where required.
- **Device:** device make and model, operating system, app version, a unique device identifier and push-notification token. We use these to confirm your phone is an approved model and to secure your account.
- **Location:** precise GPS location, collected only when you capture or submit evidence or use Car Mode, and stored with the evidence.
- **Evidence:** photos and videos captured in the app, including continuous short-loop recording while Car Mode is active, together with date, time, GPS location, offence type, vehicle registration numbers (which the app may read automatically from images) and any notes you add.
- **Support:** messages you send us.

Your live selfie and facial verification are biometric information, and criminal record checks involve information about criminal behaviour. Both are special personal information under POPIA. We process them only with your consent and only to verify your identity and suitability to submit evidence.

### 3. Information about people who appear in evidence

Submitted evidence may show vehicles, number plates, drivers, passengers and bystanders. We use it only to adjudicate the alleged offence. When an offence is accepted, we obtain the registered owner's or driver's details from eNaTIS or the relevant authority so that an infringement notice can be issued. Evidence of a crime is referred to the South African Police Service (SAPS).

We do not use this information for any other purpose, and we do not publish it. Information about bystanders is not processed beyond what is needed to review the evidence.

### 4. Why we use your information

| Purpose | Lawful basis under POPIA |
| --- | --- |
| Register and verify you, and keep fraudulent users out | Your consent; performing our contract with you |
| Run your account, dashboard and notifications | Performing our contract with you |
| Receive, adjudicate and forward evidence to authorities | Our legitimate interest and that of the public in road safety and law enforcement; legal obligations |
| Support legal proceedings, including subpoenas | Establishing and defending rights in law; legal obligations |
| Pay rewards and meet tax rules | Performing our contract; legal obligations |
| Secure the app, prevent misuse and enforce our Terms | Our legitimate interest |
| Improve the app, including training our systems to recognise offences and number plates | Our legitimate interest, using de-identified data where possible |

We will only send you marketing messages if you opt in, and you can opt out at any time.

### 5. Who we share information with

- **Traffic and law-enforcement authorities:** metropolitan and municipal traffic departments, the Road Traffic Management Corporation and its service providers, eNaTIS, and SAPS.
- **Courts and prosecutors:** when evidence is needed in proceedings or we receive a lawful request.
- **Verification providers:** credit bureaus and identity, criminal-record and address-verification services.
- **Service providers:** cloud hosting, payment processing, messaging and support providers who act on our instructions under written agreements.
- **Emergency reaction services:** only if you subscribe to that optional service.

We do not share your identity with the person you report. We do not sell personal information.

### 6. Transfers outside South Africa

Some of our service providers, such as cloud hosting, may store information outside South Africa. We only transfer information to countries with adequate data-protection laws, or under binding agreements that give protection equivalent to POPIA, as section 72 of POPIA requires.

### 7. How we protect information

Evidence is captured only inside the app, encrypted on the device with its date, time and location, and cannot be edited or shared from the app. Information is encrypted in transit and at rest, access is limited to authorised staff, and we keep audit logs of who accesses evidence. If a security compromise affects you, we will notify you and the Information Regulator.

### 8. How long we keep information

| Information | Retention |
| --- | --- |
| Evidence on your phone after upload | Deleted from the device \[7 / 60\] days after successful upload |
| Evidence and adjudication records | Until any related proceedings are finalised, plus \[X\] years |
| Declined submissions | \[X\] months after the decision |
| Verification documents and selfies | While your account is active, then deleted within \[90\] days |
| Payment and tax records | 5 years after the payment |
| Car Mode loop recording not saved by you | Overwritten automatically; never uploaded |

After these periods we delete or de-identify the information.

### 9. Your rights

You may ask us to confirm what information we hold about you and to give you a copy; correct or delete information that is inaccurate, out of date or unlawfully held; object to processing based on legitimate interests; withdraw consent (this may mean you can no longer use the app); and opt out of marketing. Email privacy@ucanfine.com. We will respond within 30 days and may need to verify your identity first. To delete your account, see Account Deletion.

You can also complain to the Information Regulator: website inforegulator.org.za, email POPIAComplaints@inforegulator.org.za, general enquiries enquiries@inforegulator.org.za, toll-free 0800 017 160.

### 10. Children

U CANFINE is only for people aged 18 and older. We do not knowingly register anyone younger. Children may appear in evidence; that evidence is used only as described in section 3.

### 11. Changes to this policy

We will post changes on this page and update the date above. If a change is significant, we will tell you in the app, and you will be asked to accept it at your next login.

### 12. Contact

Information Officer, \[REGISTERED COMPANY NAME\], \[PHYSICAL ADDRESS\] · privacy@ucanfine.com · \[PHONE\]. Our PAIA manual is available at \[URL or on request\].

## 8. Terms and Conditions (`/terms`)

Clauses in **bold** limit your rights or create risk for you; the Consumer Protection Act requires them to be prominent, so the agent must keep them bold. Publish everything below this line.

---

# U CANFINE Terms and Conditions

Version 1.0 · Last updated: \[DATE\]

### 1. About these terms

These terms are an agreement between you and \[REGISTERED COMPANY NAME\] (registration number \[NUMBER\]) ("U CANFINE", "we", "us"). They apply to the U CANFINE app, the website ucanfine.com and all related services. Our Privacy Policy forms part of these terms.

You must accept these terms when you register and again each time you log in, at least once every 24 hours, and before capturing or submitting evidence if 24 hours have passed. If you do not accept, you cannot use the app.

### 2. Who can use U CANFINE

You must be at least 18 years old, a South African resident with a valid South African ID, and approved through our verification process, including identity, address, credit and criminal record checks. You must use a phone make and model that we have approved. We may refuse or cancel registration at our discretion, and we do not have to give reasons.

### 3. Your account

You may have only one account. Keep your login details private and do not let anyone else use your account or phone to submit evidence. You must log in at least once a day and complete live selfie verification when asked. Tell us immediately at support@ucanfine.com if your account or phone is compromised. You are responsible for everything submitted from your account.

### 4. Safe and lawful use

**4.1 You must never use the app while driving unless your phone is mounted in a certified cradle and the app is in Car Mode.** Handling a phone while driving is illegal and dangerous.

**4.2 You must not put yourself or anyone else at risk to capture evidence.** Do not confront, follow, obstruct or approach any person or vehicle. If you are in danger, contact SAPS on 10111 or emergency services on 112.

4.3 You may only record in places where you are lawfully present and may lawfully record. Do not trespass or record inside private property without permission.

4.4 You must obey all traffic and other laws while using the app.

### 5. Evidence rules

5.1 All evidence must be captured inside the U CANFINE app. Evidence from your gallery, other apps or other devices is not accepted.

5.2 You must not edit, alter, stage, fabricate, filter or share evidence, or try to bypass the app's encryption, date, time or location stamps.

5.3 Each submission must be honest. Select the offence type and vehicle registration to the best of your knowledge, and only submit offences you actually witnessed.

5.4 You must not use the app to harass, target or settle disputes with anyone, or submit evidence about a person or vehicle you have a conflict with.

5.5 The app does not accept speeding offences.

**5.6 Knowingly submitting false evidence may be a criminal offence. We will report it to the authorities and may claim damages from you.**

### 6. Adjudication

Every submission is reviewed by qualified traffic officers at the U CANFINE Adjudication Centre, and may be accepted or declined. Accepted traffic offences are referred to the relevant authority for an infringement notice. Crimes are referred to SAPS. Adjudication decisions are final for the purpose of rewards. The authority or a court may still withdraw or cancel a fine, and we have no control over that.

### 7. Court appearances

**By using U CANFINE you agree to give evidence in court about your submission if you are subpoenaed.** We will tell you if this is required and, \[where we elect to, our legal team will support you at no cost to you\]. If you fail to comply with a subpoena, you may face legal consequences and your account may be suspended.

### 8. Rewards

8.1 You earn a reward for each submission that is accepted and results in a fine being \[issued / paid\]. Reward amounts are set out in the app and may change; the amount shown when you submit applies to that submission.

**8.2 Declined submissions, offences later withdrawn or cancelled by an authority or a court, and submissions that breach these terms earn no reward. We may withhold or recover any reward paid in breach of these terms.**

8.3 Rewards are paid by EFT to a South African bank account in your name, within \[X\] days of the reward becoming due.

8.4 Rewards are income. You are responsible for declaring them and paying any tax due. Using U CANFINE does not make you our employee, agent or a law-enforcement officer.

**8.5 We do not guarantee any level of earnings.**

### 9. Ownership of evidence

You keep any rights you have in your evidence, but you give us a perpetual, irrevocable, royalty-free licence to store, copy, analyse, use and share it with authorities and courts, and to use it in de-identified form to improve our systems. You confirm that you have the right to give us this licence.

The app, website, software, trademarks and content belong to U CANFINE or our licensors and are protected by law, including patent applications ZA 2023/04569 and PCT/ZA2024/050016. You may not copy, reverse-engineer or modify the app.

### 10. Optional paid services

We may offer optional paid services, such as an emergency reaction-unit service. These have their own fees and terms, which will be shown to you before you subscribe.

### 11. Suspension and termination

**If you break these terms or the law, we may suspend your account for at least six months or close it permanently, withhold rewards, and report you to the authorities.** You may close your account at any time (see Account Deletion). Clauses 5.6, 7, 8.2, 9, 12 and 13 survive closure, including your duty to appear in court for evidence you submitted.

### 12. Disclaimer {#disclaimer}

U CANFINE is a reporting tool. We are not a traffic authority, the police or an emergency service. Do not rely on the app in an emergency; call 10111 or 112.

**The app is provided "as is". We do not guarantee that it will always be available, error-free or compatible with your phone, or that any submission will be accepted, prosecuted or result in a fine.**

### 13. Limitation of liability

**To the extent the law allows, U CANFINE is not liable for any loss, injury or damage arising from your use of the app, including from actions you take to capture evidence, from offenders or third parties, or from decisions of authorities or courts. Our total liability to you is limited to the rewards owed to you under these terms.** You indemnify us against claims arising from your breach of these terms or the law. Nothing in these terms limits liability for gross negligence or any right you have under the Consumer Protection Act that cannot be excluded.

### 14. Changes

We may change these terms. The latest version is always on this page, and you will be asked to accept it at your next login.

### 15. Law and disputes

These terms are governed by the laws of South Africa. Please contact us first at support@ucanfine.com to resolve any dispute. If it is not resolved within 30 days, either party may refer it to a competent South African court.

### 16. Contact

&#91;REGISTERED COMPANY NAME\], \[PHYSICAL ADDRESS\] · support@ucanfine.com · \[PHONE\].

## 9. Open items to confirm before go-live

The site can be built now with placeholders, but it cannot go live until these are answered. The first five block publication.

- [ ] **Operating entity.** Which registered company operates U CANFINE: its name, registration number, physical address and phone. Needed for the footer, both legal pages and ECTA section 43.
- [ ] **Information Officer.** Name the Information Officer and confirm registration with the Information Regulator.
- [ ] **Reward trigger.** Sources conflict: the attorney briefing says the user is paid once the fine is issued; the decks say on approval and collection of the fine. Pick one for Home, Terms 8.1 and the FAQ.
- [ ] **Retention periods.** Device media retention is 7 days in the bug list (issue 18) and 60 days in BUG-005. Also set periods for evidence, declined submissions and verification documents (Privacy Policy section 8).
- [ ] **Attorney review.** Have both legal pages reviewed, especially the processing of offenders' information (alleged criminal behaviour is special personal information under POPIA), the biometric selfie consent, and the liability clauses.
- [ ] **Free legal support in court.** The DPP deck promises legal representation at no cost. Confirm it is a firm commitment before it appears on the site (Home safety section, Terms 7).
- [ ] **Reaction-unit service.** Is it launching? If not, remove it from the FAQ and Terms 10.
- [ ] **Mailboxes.** Create info@, support@ and privacy@ucanfine.com, and name a contact for authorities and partners.
- [ ] **Account deletion in the app.** Confirm the in-app path, and what happens to submissions still under review.
- [ ] **Brand files.** Supply the official logo and app colours; otherwise the interim wordmark and proposed palette go live.
- [ ] **Store listings.** App Store and Google Play URLs for the badges, and add `/privacy-policy` and `/delete-account` to both listings.
- [ ] **App links.** Point the app's Terms of Use, Privacy Policy and Disclaimer links to `/terms`, `/privacy-policy` and `/disclaimer` (closes BUG-002 and issue 5).
- [ ] **PAIA manual.** Publish one, or state it is available on request.

The Information Regulator contact details are from its [contact page](https://inforegulator.org.za/?p=1256) and a [Western Cape Government notice](https://www.westerncape.gov.za/your_gov/70/documents/policies/P/56894?toc_page=7); recheck before publishing.
