'use client'
import { Trophy, Coins, Gamepad } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import HomeHero from "./(Global)/Home/Hero";
import TrendingGames from "./(Global)/Home/Trending";
import Categories from "./(Global)/Home/Categories";


export default function Home() {

  return (
    <main className="min-h-screen opacity-90">
      <HomeHero />
      <Categories />
      <TrendingGames />

      {/* Services Section */}
      <section className="py-20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-[var(--text-primary)] mb-16">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: Gamepad,
                title: "Game Accounts",
                description: "Buy and sell verified game accounts",
                gradient: "from-[var(--gradient-start)] to-[var(--gradient-end)]"
              },
              {
                icon: Trophy,
                title: "Power Leveling",
                description: "Professional boosting services from top-rated players",
                gradient: "from-[var(--gradient-start)] to-[var(--gradient-end)]"
              },
              {
                icon: Coins,
                title: "In-Game Currency",
                description: "Fast delivery of game currencies at competitive prices",
                gradient: "from-[var(--gradient-start)] to-[var(--gradient-end)]"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group transform transition-transform duration-300 hover:scale-105"
              >
                <div className="p-10 rounded-2xl bg-[var(--bg-secondary)]/90 backdrop-blur-md 
                               border border-[var(--border)] shadow-lg">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} 
                                 flex items-center justify-center mb-8`}>
                    <service.icon className="w-10 h-10 text-[var(--text-primary)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-[var(--text-secondary)]">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Join millions of gamers and start trading today. Create your account in minutes!
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/Auth/Register"
                className="px-8 py-4 bg-[var(--accent-primary)] text-[var(--text-primary)] 
                           rounded-full font-semibold hover:bg-[var(--accent-secondary)] 
                           transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/Auth/Login"
                className="px-8 py-4 border-2 border-[var(--border)] text-[var(--text-primary)] 
                           rounded-full font-semibold hover:bg-[var(--accent-primary)] 
                           hover:text-[var(--text-primary)] transition-colors"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
