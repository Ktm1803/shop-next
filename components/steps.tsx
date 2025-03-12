"use client"

import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  name: string
}

interface StepsProps {
  steps: Step[]
  currentStep: string
}

export function Steps({ steps, currentStep }: StepsProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isActive = step.id === currentStep
          const isCompleted = steps.findIndex((s) => s.id === step.id) < currentStepIndex

          return (
            <li
              key={step.id}
              className={cn(stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "", "relative flex items-center")}
            >
              {isCompleted ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-primary" />
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <CheckIcon className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              ) : isActive ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-muted" />
                  </div>
                  <div
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background"
                    aria-current="step"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-muted" />
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-background">
                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              )}

              {stepIdx !== steps.length - 1 && (
                <div className="hidden sm:block absolute top-0 right-0 h-full w-5 md:w-20" aria-hidden="true">
                  <svg className="h-full w-full text-muted" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              <span className="ml-4 text-sm font-medium">{step.name}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

