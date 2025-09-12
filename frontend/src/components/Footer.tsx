// frontend/src/components/Footer.tsx

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-white relative overflow-hidden py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-teal-900/10 to-transparent" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-teal-400">INFINIPETS</h3>
                        <p className="text-gray-400 mb-6">
                            Luxury fashion for the modern pet parent, celebrating the unique bond between humans and their companions.
                        </p>
                        {/* Social Icons can be added here */}
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-teal-400">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'Shop', 'Categories', 'About', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-teal-400">Customer Service</h4>
                        <ul className="space-y-2">
                            {['Size Guide', 'Shipping & Returns', 'Care Instructions', 'FAQ'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-teal-400">Contact Information</h4>
                        <div className="space-y-3 text-gray-400">
                            <p>123 Fashion Avenue, London, UK</p>
                            <p>+44 20 7123 4567</p>
                            <p>hello@infinipets.com</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 INFINIPETS. All rights reserved. | Privacy Policy | Terms of Service</p>
                </div>
            </div>
        </footer>
    );
}