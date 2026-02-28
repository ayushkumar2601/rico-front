"use client"

import Link from "next/link"
import { HeroTerminal } from "@/components/hero-terminal"

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="relative mx-auto max-w-[1200px] px-6 py-32 lg:px-8 lg:py-48">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Typography */}
            <div className="flex flex-col justify-center space-y-12">
              <div className="space-y-6">
                <div className="font-mono text-[15px] uppercase tracking-[0.2em] text-primary/70">
                  SYSTEM VERSION 1.0 // OPERATIONAL
                </div>
                <h1 className="text-[clamp(6rem,18vw,13.5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-foreground">
                  RICO<span className="inline-block h-[0.2em] w-[0.2em] translate-y-[-0.5em] rounded-full bg-primary"></span>
                </h1>
                <div className="text-[clamp(1.5rem,3.75vw,2.25rem)] font-bold uppercase tracking-tight text-foreground/90">
                  AUTONOMOUS API SECURITY ORCHESTRATION
                </div>
                <p className="text-base leading-relaxed text-muted-foreground max-w-xl">
                  AI-powered security engine that discovers, analyzes, and validates API vulnerabilities through deterministic reasoning. Built for modern development teams who need real security, not false positives.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/scan"
                  className="group inline-flex items-center justify-center border border-primary bg-transparent px-12 py-6 font-mono text-base uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  INITIATE SCAN
                </Link>
                <Link 
                  href="/docs"
                  className="group inline-flex items-center justify-center border border-border bg-transparent px-12 py-6 font-mono text-base uppercase tracking-wider text-foreground transition-all hover:border-primary/50"
                >
                  DOCUMENTATION
                </Link>
              </div>
            </div>

            {/* Right: Terminal */}
            <div className="flex items-center">
              <HeroTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="border-b border-border bg-card py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-16 text-center text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-foreground">
            APIs ARE THE NEW ATTACK SURFACE.
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "State-Dependent Logic",
                desc: "Static scanners miss vulnerabilities that only appear through specific request sequences and state transitions."
              },
              {
                title: "Business Logic Flaws",
                desc: "CI pipelines ignore complex business vulnerabilities that require understanding application context and workflows."
              },
              {
                title: "Authorization Boundaries",
                desc: "Authorization boundaries are poorly validated across microservices, leading to privilege escalation vectors."
              },
              {
                title: "Exploit Chains",
                desc: "Multi-step exploit chains go undetected when tools only test individual endpoints in isolation."
              }
            ].map((problem, idx) => (
              <div
                key={idx}
                className="group border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(200,255,22,0.1)]"
              >
                <h3 className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-primary/80">
                  {problem.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {problem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT HAPPENS IF NOT SOLVED */}
      <section className="border-b border-border py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-16 text-center text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
            UNDETECTED LOGIC FLAWS BECOME BREACHES.
          </h2>
          
          <div className="mb-16 text-center">
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
              When API vulnerabilities slip through traditional security tools, the consequences are severe. Logic flaws in authentication, authorization, and business workflows create attack vectors that are actively exploited in production systems.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                title: "Data exposure", 
                desc: "Unauthorized access to sensitive user data through broken object-level authorization (BOLA). Attackers enumerate IDs to access records they shouldn't see.",
                impact: "Average breach cost: $4.45M"
              },
              { 
                title: "Privilege escalation", 
                desc: "Attackers gain admin rights by exploiting state-dependent authorization flaws. Role-based access controls fail under specific request sequences.",
                impact: "Complete system compromise"
              },
              { 
                title: "Financial manipulation", 
                desc: "Business logic vulnerabilities enable transaction tampering, price manipulation, and fraud. Race conditions in payment flows lead to monetary loss.",
                impact: "Direct revenue impact"
              }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4 border-l-2 border-primary/30 pl-6">
                <h3 className="font-mono text-lg font-bold uppercase tracking-wide text-primary">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <div className="pt-2 font-mono text-xs uppercase tracking-wider text-primary/60">
                  {item.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT IS RICO */}
      <section className="border-b border-border bg-card py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-16 text-center text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
            RICO IS A DETERMINISTIC AI SECURITY ENGINE.
          </h2>
          
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground/90">
                RICO combines AI-powered reasoning with deterministic validation to identify real API vulnerabilities. Unlike traditional scanners, RICO understands business logic, tracks state across requests, and validates exploitability.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Built for modern API architectures, RICO integrates directly into your CI/CD pipeline to enforce security standards before deployment. Every vulnerability report includes proof-of-concept evidence and deterministic reproduction steps.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                RICO doesn't just find potential issues—it proves they're exploitable. This eliminates false positives and gives your team actionable intelligence they can trust.
              </p>
            </div>
            
            <div className="space-y-6 border-l border-border pl-8">
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-primary">
                Core Capabilities
              </h3>
              {[
                {
                  title: "Cognitive endpoint mapping",
                  desc: "AI-driven discovery that understands API structure and relationships"
                },
                {
                  title: "Multi-step exploit reasoning",
                  desc: "Identifies complex attack chains across multiple requests"
                },
                {
                  title: "Deterministic validation flows",
                  desc: "Proves exploitability with concrete evidence, not guesses"
                },
                {
                  title: "CI/CD enforcement integration",
                  desc: "Fails builds on critical findings, preventing vulnerable deployments"
                }
              ].map((feature, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-primary">→</span>
                    <div>
                      <div className="font-medium text-foreground/90">{feature.title}</div>
                      <div className="text-sm text-muted-foreground">{feature.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="relative overflow-hidden border-b border-border py-24 lg:py-32">
        {/* Background text */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-mono text-[clamp(4rem,15vw,12rem)] font-black uppercase tracking-tighter text-foreground/[0.02]">
          OPERATIONS
        </div>
        
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-16 text-center text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
            FOUR-PHASE SECURITY VALIDATION
          </h2>
          
          <div className="grid gap-px border border-border md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                title: "UNDERSTAND",
                desc: "Autonomous endpoint discovery and API surface mapping with intelligent classification. RICO analyzes OpenAPI specs, traffic patterns, and code to build a complete attack surface model."
              },
              {
                num: "02",
                title: "REASON",
                desc: "AI-powered vulnerability analysis identifies attack vectors through logical inference. RICO understands business logic, state dependencies, and authorization boundaries."
              },
              {
                num: "03",
                title: "EXECUTE",
                desc: "Precision security testing simulates real-world attack scenarios with controlled execution. RICO validates exploitability through deterministic proof-of-concept attacks."
              },
              {
                num: "04",
                title: "REPORT",
                desc: "Structured intelligence output with actionable findings, severity classification, and remediation paths. Every vulnerability includes reproduction steps and fix guidance."
              }
            ].map((op, idx) => (
              <div
                key={op.num}
                className="group border-b border-border bg-card/50 p-8 transition-all hover:-translate-y-0.5 md:border-b-0 md:border-r md:last:border-r-0 lg:border-b-0"
              >
                <div className="mb-4 font-mono text-xs text-primary/50">
                  {op.num}
                </div>
                <div className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  {op.title}
                </div>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {op.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DETERMINISTIC AI */}
      <section className="border-b border-border bg-card py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-8 text-center text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
            NOT PROBABILISTIC. DETERMINISTIC.
          </h2>
          
          <div className="mx-auto mb-12 max-w-3xl space-y-6 text-center">
            <p className="text-lg leading-relaxed text-foreground/90">
              RICO does not hallucinate. RICO validates exploitability. RICO confirms real attack paths.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Every vulnerability report includes proof-of-concept evidence and deterministic reproduction steps. No guesswork. No false positives. Just verified security findings your team can act on immediately.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Traditional AI security tools generate probabilistic assessments that require manual verification. RICO's deterministic engine proves vulnerabilities are exploitable before reporting them.
            </p>
          </div>
          
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="rounded-lg border border-border bg-background p-6 font-mono text-sm">
              <div className="mb-2 text-muted-foreground"># Scan with strict validation</div>
              <div className="text-primary">rico scan --spec openapi.yaml --fail-on high</div>
            </div>
            
            <div className="rounded-lg border border-border bg-background p-6 font-mono text-sm">
              <div className="mb-2 text-muted-foreground"># Generate SARIF report for CI/CD</div>
              <div className="text-primary">rico scan --spec api.yaml --report-sarif rico.sarif</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CI/CD IMPLEMENTATION */}
      <section className="border-b border-border py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-foreground">
                Enforce Security in Your Pipeline
              </h2>
              <p className="text-lg leading-relaxed text-foreground/90">
                Integrate RICO into your deployment pipeline to catch vulnerabilities before they reach production. Configure risk thresholds and fail builds automatically when critical issues are detected.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                RICO runs in minutes, not hours. Scan on every pull request, before deployment, or on a schedule. Security becomes a deployment gate, not an afterthought.
              </p>
              <div className="space-y-3 border-l-2 border-primary/30 pl-6">
                <div className="text-sm text-muted-foreground">
                  → Automated scanning on every commit
                </div>
                <div className="text-sm text-muted-foreground">
                  → Configurable severity thresholds
                </div>
                <div className="text-sm text-muted-foreground">
                  → SARIF output for GitHub Security
                </div>
                <div className="text-sm text-muted-foreground">
                  → Build fails on critical findings
                </div>
              </div>
              <div className="border-b border-primary/30 pt-4"></div>
            </div>
            
            <div className="flex flex-col justify-center space-y-6">
              <div className="rounded-lg border border-border bg-background p-6 font-mono text-sm">
                <div className="mb-4 text-muted-foreground"># GitHub Actions / GitLab CI</div>
                <div className="space-y-2">
                  <div className="text-foreground/90">- name: RICO Security Scan</div>
                  <div className="pl-4 text-foreground/90">run: |</div>
                  <div className="pl-8 text-foreground/90">rico scan --spec api.yaml \</div>
                  <div className="pl-12 text-foreground/90">--report-sarif rico.sarif \</div>
                  <div className="pl-12 text-foreground/90">--fail-on high</div>
                </div>
              </div>
              
              <div className="rounded-lg border border-primary/20 bg-card p-4">
                <div className="font-mono text-xs uppercase tracking-wider text-primary">
                  Result: Build fails if high-severity vulnerabilities detected
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="mb-6 text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-foreground">
            SECURE YOUR API SURFACE.
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
            Start scanning your APIs today. No credit card required. No installation needed for the online demo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/scan"
              className="inline-flex items-center justify-center border border-primary bg-transparent px-16 py-6 font-mono text-lg uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              LAUNCH SCANNER
            </Link>
            <Link 
              href="/install"
              className="inline-flex items-center justify-center border border-border bg-transparent px-16 py-6 font-mono text-lg uppercase tracking-wider text-foreground transition-all hover:border-primary/50"
            >
              INSTALL LOCALLY
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
