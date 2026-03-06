import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  Globe,
  Brain,
  Pencil,
  Volume2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { toast } from 'sonner';
import { usePlacementTest, detectNativeLanguage } from '../PlacementTestContext';
import { registerPlacementLead } from '@/lib/placement-test-api';

// ============================================================================
// Constants
// ============================================================================

const SUPPORTED_LANGUAGES = [
  { value: 'English', label: 'English' },
  { value: 'German', label: 'German' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Portuguese', label: 'Portuguese' },
];

const SKILLS = [
  { icon: BookOpen, label: 'Vocabulary', description: 'Range & accuracy of words you know' },
  { icon: Brain, label: 'Grammar', description: 'Accuracy of grammatical structures' },
  { icon: Globe, label: 'Reading', description: 'Comprehension of written texts' },
  { icon: Pencil, label: 'Writing', description: 'Ability to express ideas in writing' },
];

const CEFR_LEVELS = [
  { level: 'A1', label: 'Beginner', color: 'bg-slate-100 text-slate-700' },
  { level: 'A2', label: 'Elementary', color: 'bg-blue-100 text-blue-700' },
  { level: 'B1', label: 'Intermediate', color: 'bg-green-100 text-green-700' },
  { level: 'B2', label: 'Upper-Intermediate', color: 'bg-teal-100 text-teal-700' },
  { level: 'C1', label: 'Advanced', color: 'bg-purple-100 text-purple-700' },
  { level: 'C2', label: 'Proficient', color: 'bg-amber-100 text-amber-700' },
];

// ============================================================================
// Form schema
// ============================================================================

const landingSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName: z.string().trim().min(1, 'Last name is required').max(50),
  email: z.string().trim().email('Please enter a valid email').max(255),
  language: z.string().min(1, 'Please select a language to test'),
  consent: z.boolean().refine((v) => v === true, {
    message: 'You must consent to continue',
  }),
});

type LandingFormData = z.infer<typeof landingSchema>;

// ============================================================================
// Component
// ============================================================================

export function LandingStep() {
  const { state, dispatch } = usePlacementTest();
  const [showNativeOverride, setShowNativeOverride] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LandingFormData>({
    resolver: zodResolver(landingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      language: '',
      consent: false,
    },
  });

  const selectedLanguage = form.watch('language');

  async function onSubmit(data: LandingFormData) {
    setIsSubmitting(true);
    try {
      const { success } = await registerPlacementLead({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        language: data.language,
        consent: true,
      });

      if (success) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: {
            userInfo: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
            },
            language: data.language,
            nativeLanguage: state.nativeLanguage,
          },
        });
      }
    } catch (err: any) {
      toast.error('Something went wrong. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <SEO
        title="Free Language Placement Test — Discover Your CEFR Level | WriteWise"
        description="Take our free AI-powered CEFR language placement test. Discover your level in English, German, Spanish, French, Italian, or Portuguese in just 20 minutes."
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-brand-subtle opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className="animate-fade-in-up">
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
                Free AI Assessment
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                Discover Your{' '}
                <span className="text-gradient-brand">
                  {selectedLanguage || 'Language'}
                </span>{' '}
                Level in 20 Minutes
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our AI-powered CEFR placement test gives you an accurate, personalised assessment
                of your language skills — grammar, vocabulary, reading and writing — completely free.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span>15–20 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span>CEFR-aligned (A1–C2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>Detailed report emailed to you</span>
                </div>
              </div>
            </div>

            {/* Right: CEFR levels visual */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {CEFR_LEVELS.map(({ level, label, color }) => (
                <div key={level} className="card-elevated p-4 rounded-xl flex items-center gap-3">
                  <span className={`text-xl font-bold px-3 py-1.5 rounded-lg ${color}`}>
                    {level}
                  </span>
                  <div>
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-xs text-muted-foreground">CEFR Level</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What we test ─────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-10">What the test covers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map(({ icon: Icon, label, description }) => (
              <div key={label} className="card-elevated p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{label}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead form ────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50" id="start-test">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="card-elevated rounded-2xl p-8 lg:p-10">
            <h2 className="text-2xl font-bold mb-2">Start your free test</h2>
            <p className="text-muted-foreground mb-8">
              Enter your details below and we'll send you a detailed report after the test.
            </p>

            {/* Native language indicator */}
            <div className="mb-6 p-3 bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                Test instructions will be in{' '}
                <span className="font-medium text-foreground">{state.nativeLanguage}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowNativeOverride(!showNativeOverride)}
                className="text-xs text-purple-600 hover:underline flex items-center gap-1"
              >
                Change
                {showNativeOverride ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            </div>

            {showNativeOverride && (
              <div className="mb-6">
                <label className="text-sm font-medium mb-1.5 block">My native language</label>
                <Select
                  value={state.nativeLanguage}
                  onValueChange={(v) => dispatch({ type: 'SET_NATIVE_LANGUAGE', payload: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="Anna" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Müller" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="anna@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        Your detailed report will be sent here.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language to assess</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SUPPORTED_LANGUAGES.map((l) => (
                            <SelectItem key={l.value} value={l.value}>
                              {l.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-lg border border-input p-4 bg-muted/30">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          I consent to WriteWise contacting me about language learning services.
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          We respect your privacy. Unsubscribe at any time.
                        </p>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-brand hover:opacity-90 text-white py-3 text-base font-semibold h-auto"
                >
                  {isSubmitting ? (
                    'Setting up your test...'
                  ) : (
                    <>
                      Start Free Test
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                step: '1',
                title: 'Fill in your details',
                desc: 'Enter your name, email, and select the language you want to assess.',
              },
              {
                step: '2',
                title: 'Take the 20-minute test',
                desc: 'Complete our AI-generated CEFR questions spanning vocabulary, grammar, reading and writing.',
              },
              {
                step: '3',
                title: 'Get your results',
                desc: 'See your CEFR level instantly. A detailed report with personalised recommendations is emailed to you.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-brand text-white text-xl font-bold flex items-center justify-center mb-4">
                  {step}
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
