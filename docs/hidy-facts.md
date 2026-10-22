# Hidy Vault — verified facts (the ONLY Hidy claims the SEO loop may make)

Verified against the app code in ~/Code/hidy-vault (UI/SettingsView.swift help texts,
UI/PaywallView.swift Free/Pro table, Core/) on 2026-10-22. If a page needs a Hidy fact that
is not here, leave it out. Update this file by hand when the app changes.

## Product
- Hidy Vault: encrypted vault for iPhone, iOS 16 or later. Publisher PT Mirai Kreasi Negeri.
- Not yet on the App Store (in review). Say "coming to the App Store"; never give a store link,
  rating, review count or download number.
- No account, no analytics or advertising SDK, no Hidy server that stores vaults.

## Unlock and vaults
- Unlock by drawing a pattern on a 5×5 grid, at least 6 different dots. Tap controls exist.
- Each valid pattern opens its own vault. An unused pattern opens a new, empty vault that is
  only saved once the first item is added. No list of vaults, no wrong-pattern message.
- Legacy 4×4 input exists only for vaults made by the earlier prototype.
- The pattern plus a device secret in the iPhone Keychain derive the key (PBKDF2/HKDF).
- AES-256-GCM encrypts file contents, file names, thumbnails, folders and notes. Large videos
  are encrypted in authenticated chunks.
- Change a vault's pattern in its Settings. Hidy cannot reset a forgotten pattern.
- No Face ID / Touch ID unlock for Hidy itself. Do not claim one.

## Recovery and backup
- Each vault can have its own 12-word recovery phrase (words from a 2,048-word list), shown
  once. It reopens the vault if the pattern is forgotten (then choose a new pattern) and opens
  that vault's encrypted backups on any iPhone. A new phrase replaces the old for the vault and
  future backups; older backups still open with the old phrase.
- iCloud backup per vault (needs the recovery phrase first): encrypted on the iPhone before
  upload, stored in the user's own iCloud via CloudKit, updated after every change.
- Backup file export (Files, iCloud Drive, AirDrop). Restore on the lock screen: "Restore from
  iCloud" or "Restore from a backup file", then the phrase.
- Do not uninstall Hidy to troubleshoot: local vaults and the Keychain secret can be lost.

## Content
- Import photos and videos from Photos; any file from Files; plain-text notes; folders (removing
  a folder keeps its files in the vault). Documents preview inside Hidy (QuickLook).
- Hidy's own camera ("Take photo or video" in the add menu) saves straight into the vault; those
  photos never reach the Photos library.
- After importing from Photos, Hidy offers to delete the originals; iOS asks to confirm and keeps
  them in Recently Deleted up to 30 days. The offer can be turned off in Settings.
- Import quality "Optimized" (default): smaller files (HEIC or JPEG, up to 3,024 px) and location
  data removed from photos and videos. "Original" keeps files exactly. If optimizing fails, the
  original is stored.
- Sharing a file out of Hidy gives the recipient a readable copy.

## Privacy behaviour
- Locks as soon as the app goes to the background; covers the app switcher; a separate privacy
  window covers open viewers while inactive. Temporary decrypted files are cleared on lock.
- An open vault is readable on screen. No independent cryptographic audit yet.
- Someone examining the app's storage can see approximate file sizes and the number of vault
  folders, not contents or names.

## Free vs Pro
- Free: 3 vaults, 100 photos and 10 videos per vault; documents, notes, recovery, backups,
  camera and on-device encryption included.
- Pro: unlimited vaults/photos/videos, sync across devices, sharing a vault, decoy vault,
  disguised app icons. Web prices: $1.99/week, $19.99/year (7-day trial for eligible), $39.99
  lifetime. App Store prices may differ.
- Decoy vault (Pro): drawing its pattern permanently deletes every other vault on that iPhone,
  then opens the decoy normally. One decoy per device. No undo; backups and other devices are
  not touched.
- Disguised icons (Pro): Calculator, Notes, Weather, Tasks. The name under the icon stays
  "Hidy Vault". Hidy is not a working fake calculator.
- Sync (Pro): through the user's own iCloud, built on iCloud backup; each device keeps its copy.
- Sharing (Pro): a 12-word invite valid 48 hours, one per person; the other person chooses
  "Join a shared vault" on the lock screen and picks their own pattern; syncs through the
  owner's iCloud, end-to-end encrypted; removing someone stops future syncing, copies stay.

## Site
- Existing pages are listed in content/**. Link only to URLs that exist.
