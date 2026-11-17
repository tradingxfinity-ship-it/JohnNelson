import { ButtonLink, Container, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <p className="text-sm font-medium text-brass">404</p>
        <h1 className="mt-3 text-4xl font-medium">We couldn’t find that page.</h1>
        <p className="mt-4 text-lg leading-relaxed">The page may have moved. Head back home or tell us what you’re looking for.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href="/#contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
