import { site } from "@/content/site";

/**
 * Notices LERA MLS requires on every page that shows its listing data: the MLS
 * as the source, the consumer-use disclaimer, and LERA's copyright line
 * (MLS rules 18.3.7–18.3.8; LERA data access agreement §8–9). Also names our
 * brokerage (rule 18.2.7) and where to report errors (rule 18.2.9).
 */
export function ListingNotice({ fetchedAt }: { fetchedAt?: string }) {
  const updated = fetchedAt
    ? new Date(fetchedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Chicago" })
    : null;
  return (
    <div className="mt-14 space-y-2 border-t border-line pt-6 text-xs leading-relaxed text-slate">
      <p>
        Based on information from LERA MLS LLC{updated ? ` as of ${updated} (Central time)` : ""}. LERA MLS does not
        guarantee and is not in any way responsible for its accuracy. All data is provided “as is” and with all faults.
        Data maintained by LERA MLS may not reflect all real estate activity in the market.
      </p>
      <p>
        IDX information is provided exclusively for consumers’ personal, non-commercial use, may not be used for any
        purpose other than to identify prospective properties consumers may be interested in purchasing, and is deemed
        reliable but not guaranteed accurate by the MLS. Listings marked with another brokerage’s name are listed by
        that brokerage.
      </p>
      <p>
        Search provided by {site.brokerage.team}, {site.brokerage.name}. To report an error in information we’ve added,
        email{" "}
        <a href={`mailto:${site.contact.email}`} className="underline underline-offset-2">
          {site.contact.email}
        </a>
        .
      </p>
      <p>Copyright LERA MLS LLC.</p>
    </div>
  );
}
