import mongoose from 'mongoose';
import User from './src/models/User.js';
import Article from './src/models/Article.js';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// Use Google DNS to bypass local DNS/ISP blocking issues.
dns.setServers(['8.8.8.8', '8.8.4.4']);

const seedDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from .env');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('Connected to MongoDB');

    // Clear existing data.
    await User.deleteMany({});
    await Article.deleteMany({});
    console.log('Cleared existing data');

    // User.create runs schema hooks, so seeded passwords are hashed.
    const users = await User.create([
      {
        firstName: 'Prinze',
        lastName: 'Admin',
        username: 'prinzeadmin',
        email: 'prinze@gmail.com',
        password: 'AdminPass123',
        contact: '09123456789',
        age: 28,
        gender: 'Male',
        role: 'Admin',
        status: 'Active',
      },
    ]);

    console.log(`Created ${users.length} users`);

    const articles = await Article.insertMany([
      {
        name: 'modern-wireframing',
        title: 'Modern Wireframing Techniques',
        content: [
          'Wireframing is the foundation of great user experience design. It allows teams to visualize ideas, test concepts, and iterate quickly before investing in full development.',
          'Modern wireframing combines traditional sketching with digital tools to create interactive prototypes. This hybrid approach enables rapid iteration while maintaining the flexibility needed for complex projects.',
          'The best wireframing tools today offer real-time collaboration, component libraries, and responsive design capabilities. Features like Figma, Sketch, and Adobe XD have transformed how teams approach wireframing.',
          'Effective wireframing follows a clear process: understand user needs, create low-fidelity sketches, develop mid-fidelity wireframes, and refine with high-fidelity prototypes. Each stage serves a specific purpose in the design journey.'
        ],
        image: 'https://via.placeholder.com/400x300?text=Wireframing',
        status: 'Active',
        author: users[0]._id,
        views: 150,
      },
      {
        name: 'responsive-layouts',
        title: 'Building Responsive Layouts',
        content: [
          'Responsive design is essential in today\'s multi-device world. With users accessing websites on phones, tablets, and desktops, your layouts must adapt seamlessly to every screen size.',
          'CSS Grid and Flexbox have revolutionized responsive design. These modern layout systems provide powerful tools for creating complex, adaptive layouts without relying on fixed dimensions or excessive media queries.',
          'The mobile-first approach ensures your design works well on small screens first, then progressively enhances for larger screens. This strategy leads to better performance and user experience across all devices.',
          'Testing responsive designs requires a multi-faceted approach: use browser dev tools, test on real devices, and consider different network conditions. Comprehensive testing ensures your layout works everywhere.'
        ],
        image: 'https://via.placeholder.com/400x300?text=Responsive+Design',
        status: 'Active',
        author: users[0]._id,
        views: 320,
      },
      {
        name: 'component-architecture',
        title: 'Component Architecture',
        content: [
          'Component-based architecture is the cornerstone of modern web development. By breaking interfaces into reusable, self-contained components, developers can build scalable, maintainable applications.',
          'Well-designed components follow the single responsibility principle, have clear interfaces, and include comprehensive tests. This approach leads to more robust applications and easier debugging when issues arise.',
          'Modern frameworks like React, Vue, and Angular provide powerful tools for component-based development. Features like state management, routing, and lifecycle hooks make building complex applications more manageable.',
          'Component libraries and design systems help maintain consistency across large projects while enabling rapid development. They provide pre-built components that follow established design patterns and best practices.'
        ],
        image: 'https://via.placeholder.com/400x300?text=Components',
        status: 'Active',
        author: users[0]._id,
        views: 210,
      },
      {
        name: 'color-theory',
        title: 'Color Theory Fundamentals',
        content: [
          'Color theory is both a science and an art form. Understanding how colors interact, create harmony, and influence user perception helps designers make informed, effective decisions.',
          'The color wheel is your foundation for understanding color relationships. Complementary, analogous, and triadic color schemes provide tried-and-true formulas for creating harmonious palettes.',
          'Color psychology plays a crucial role in design. Different colors evoke different emotions and associations. Warm colors like red and orange create energy, while cool colors like blue and green convey calm and trust.',
          'Accessibility is essential in color design. Ensure adequate contrast ratios for readability, support for color blindness, and respect for user preferences like dark mode and reduced color schemes.'
        ],
        image: 'https://via.placeholder.com/400x300?text=Color+Theory',
        status: 'Active',
        author: users[0]._id,
        views: 95,
      },
      {
        name: 'animation-principles',
        title: 'Animation Principles',
        content: [
          'Animation transforms static interfaces into engaging experiences. When done thoughtfully, animation provides visual feedback, guides user attention, and creates delightful interactions.',
          'The 12 principles of animation, developed by Disney animators, apply perfectly to digital interfaces. Principles like timing, easing, and anticipation help create natural, intuitive animations.',
          'Purpose is key in animation. Every animation should have a clear reason for existing: providing feedback, indicating state changes, or guiding user attention. Avoid animation for animation\'s sake.',
          'Performance matters in animation. Use hardware acceleration, avoid layout thrashing, and respect user preferences for reduced motion. Smooth, performant animations enhance rather than hinder user experience.'
        ],
        image: 'https://via.placeholder.com/400x300?text=Animation',
        status: 'Active',
        author: users[0]._id,
        views: 180,
      },
      {
        name: 'typography-fundamentals',
        title: 'Typography Fundamentals',
        content: [
          'Typography is the art of arranging type to make written language legible, readable, and appealing. Good typography is invisible - users notice it only when it\'s done poorly.',
          'Font selection sets the tone for your entire design. Serif fonts convey tradition and authority, sans-serif fonts feel modern and approachable, while display fonts add personality and emphasis.',
          'Hierarchy guides readers through your content. Use size, weight, color, and spacing to create clear visual relationships between headings, subheadings, and body text.',
          'Modern web typography offers unprecedented flexibility. Variable fonts, responsive sizing, and extensive web font libraries give designers powerful tools for creating beautiful, readable text across all devices.'
        ],
        image: 'https://via.placeholder.com/400x300?text=Typography',
        status: 'Active',
        author: users[0]._id,
        views: 265,
      },
    ]);

    console.log(`Created ${articles.length} articles`);
    console.log('\nDatabase seeded successfully!');
    console.log('\nTest credentials:');
    console.log('- Email: prinze@gmail.com | Password: AdminPass123 (Admin)');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
