import { PageTransition } from '../components/layout/PageTransition'
import { PillButton } from '../components/ui/PillButton'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="section flex min-h-[58vh] items-center" aria-labelledby="nf-heading">
        <div className="shell flex flex-col items-start gap-6">
          <span className="micro">Page not found</span>
          <h1 id="nf-heading" className="display text-[64px] sm:text-[96px]">
            404
          </h1>
          <p className="lede max-w-prose">
            That page isn&apos;t here. Check the navigation above, or head back to the start.
          </p>
          <PillButton to="/">Return home</PillButton>
        </div>
      </section>
    </PageTransition>
  )
}
