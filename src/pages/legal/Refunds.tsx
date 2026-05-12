import LegalLayout from "./LegalLayout";

const Refunds = () => (
  <LegalLayout title="Refund Policy" effectiveDate="TBD">
    <p>
      Hidy is a one-time lifetime purchase. If something goes wrong &mdash; or you simply change your mind &mdash;
      we&rsquo;ll refund you. Plain-English draft below; counsel will polish.
    </p>

    <h2>1. The short version</h2>
    <ul>
      <li>One-time charge at checkout. No subscription, no auto-renewal.</li>
      <li>30-day no-questions-asked refund window after purchase.</li>
      <li>To request a refund, email <a href="mailto:support@hidyapp.com">support@hidyapp.com</a> from the address you bought under.</li>
    </ul>

    <h2>2. After you buy</h2>
    <h3>2.1 One-time purchase</h3>
    <p>
      Hidy is a single charge. You receive a lifetime license for the price you paid; there is no recurring
      subscription to cancel.
    </p>
    <h3>2.2 Access after charge</h3>
    <p>
      Your license key arrives by email within a minute of payment. Paste it into Hidy and the app unlocks. Your
      license works on up to three Macs.
    </p>

    <h2>3. The 30-day refund window</h2>
    <p>
      Email us at <a href="mailto:support@hidyapp.com">support@hidyapp.com</a> within thirty days of your purchase and we&rsquo;ll
      refund the full amount, no questions asked. We typically process refunds within a few business days; the funds
      take longer to land back in your account, depending on your bank.
    </p>

    <h2>4. Duplicate charges and billing errors</h2>
    <p>
      If you see two charges for the same purchase, or a charge for an amount that doesn&rsquo;t match the price you saw
      at checkout, write to us and we&rsquo;ll reverse the duplicate or correct the error.
    </p>

    <h2>5. EU and UK consumer notice for digital products</h2>
    <p>
      EU and UK consumer law gives you a 14-day right of withdrawal for digital purchases. By starting your download
      of Hidy you may waive this right under your national implementation of the Consumer Rights Directive &mdash; our
      30-day refund window is more generous and applies regardless. If you are an EU or UK consumer and prefer to
      rely on the statutory right, say so in your refund email.
    </p>

    <h2>6. Chargebacks</h2>
    <p>
      Please contact us before opening a chargeback with your bank. We will resolve almost any reasonable refund
      request faster than the chargeback process can run, and chargebacks cost everyone more.
    </p>

    <h2>7. Abuse</h2>
    <p>
      We reserve the right to decline refunds where we see evidence of repeated buy-and-refund behaviour, license
      sharing across many devices, or attempts to bypass the device-slot limit.
    </p>

    <h2>8. Contact</h2>
    <p>
      <a href="mailto:support@hidyapp.com">support@hidyapp.com</a>
    </p>
  </LegalLayout>
);

export default Refunds;
