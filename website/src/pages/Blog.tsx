import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const featuredPost = {
  title: "How AI is Revolutionizing Language Learning in 2025",
  excerpt: "Discover how artificial intelligence is creating personalized learning experiences that adapt to each learner's unique needs, making language acquisition faster and more effective than ever.",
  author: "Dr. Elena Kowalski",
  date: "January 15, 2025",
  readTime: "8 min read",
  category: "AI & Technology",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
};

const posts = [
  {
    title: "5 Common Mistakes Intermediate Learners Make (And How to Fix Them)",
    excerpt: "Breaking through the intermediate plateau requires avoiding these common pitfalls that keep learners stuck.",
    author: "Sofia Andersson",
    date: "January 10, 2025",
    readTime: "6 min read",
    category: "Learning Tips",
  },
  {
    title: "The Science Behind Spaced Repetition in Language Learning",
    excerpt: "Understanding how your brain retains information can help you study smarter, not harder.",
    author: "Marcus Chen",
    date: "January 5, 2025",
    readTime: "7 min read",
    category: "Research",
  },
  {
    title: "Business Writing: Essential Skills for Non-Native Speakers",
    excerpt: "Master the art of professional communication with these practical tips and examples.",
    author: "James Okonkwo",
    date: "December 28, 2024",
    readTime: "10 min read",
    category: "Business English",
  },
  {
    title: "From B1 to B2: A Realistic Timeline and Study Plan",
    excerpt: "What it really takes to advance your language skills to the upper-intermediate level.",
    author: "Dr. Elena Kowalski",
    date: "December 20, 2024",
    readTime: "12 min read",
    category: "Learning Tips",
  },
  {
    title: "The Best Resources for Practicing Writing in Your Target Language",
    excerpt: "A curated list of tools, communities, and platforms to help you practice writing daily.",
    author: "Sofia Andersson",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Resources",
  },
  {
    title: "How to Use ChatGPT Effectively for Language Learning",
    excerpt: "Practical strategies for leveraging AI assistants as conversation partners and tutors.",
    author: "Marcus Chen",
    date: "December 10, 2024",
    readTime: "9 min read",
    category: "AI & Technology",
  },
];

const categories = ["All", "Learning Tips", "AI & Technology", "Research", "Business English", "Resources"];

const Blog = () => {
  return (
    <Layout>
      <SEO
        title="WriteWise Blog - Language Learning Tips & AI Insights"
        description="Expert articles on language learning, AI technology, and effective communication. Tips for intermediate learners (A2-C1)."
        keywords="language learning blog, AI language learning, writing tips, CEFR"
        ogType="website"
      />
      {/* Hero */}
      <section className="bg-gradient-brand-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              WriteWise <span className="text-gradient-brand">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights, tips, and research on language learning, AI technology, and effective communication.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="card-elevated overflow-hidden border-0">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video bg-gradient-brand md:aspect-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="flex flex-col justify-center p-8">
                <Badge className="mb-4 w-fit bg-primary/10 text-primary hover:bg-primary/20">
                  {featuredPost.category}
                </Badge>
                <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="mb-6 text-muted-foreground">{featuredPost.excerpt}</p>
                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Button className="w-fit bg-gradient-brand hover:opacity-90">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={index === 0 ? "bg-gradient-brand hover:opacity-90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.title} className="card-elevated group cursor-pointer border-0 transition-transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                    {post.category}
                  </Badge>
                  <h3 className="mb-3 text-xl font-semibold text-foreground group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Subscribe to Our <span className="text-gradient-brand">Newsletter</span>
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Get weekly tips, insights, and resources delivered straight to your inbox.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-gradient-brand px-8 hover:opacity-90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
