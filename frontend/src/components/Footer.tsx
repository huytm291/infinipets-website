import React from 'react';
import { motion } from 'framer-motion'; 

export default function Footer() {
    // Dữ liệu cho các social icons, bạn có thể thay đổi đường dẫn ảnh trong thư mục public
    const socialLinks = [
        { name: 'Facebook', icon: '/social-icons/facebook.png', url: '#' },
        { name: 'Instagram', icon: '/social-icons/instagram.png', url: '#' },
        { name: 'Twitter', icon: '/social-icons/twitter.png', url: '#' },
        { name: 'Pinterest', icon: '/social-icons/pinterest.png', url: '#' },
    ];

    return (
        <footer className="bg-midnight-blue text-white relative overflow-hidden py-16 md:py-20">
            {/* Background animation layer - Tái tạo hiệu ứng footerGradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-yellow-500/5 animate-footer-gradient"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
                    {/* Section 1: Brand Info & Social */}
                    <div className="footer-section">
                        <h3 className="text-xl font-bold mb-4 text-dark-turquoise relative pb-2">
                            INFINIPETS
                            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-dark-turquoise"></span>
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Luxury fashion for the modern pet parent, celebrating the unique bond between humans and their companions.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    aria-label={link.name}
                                    className="w-11 h-11 rounded-full bg-gradient-to-br from-deep-sky-blue4 to-dark-turquoise flex items-center justify-center relative overflow-hidden group transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-teal-500/50"
                                >
                                    {/* Shimmer effect */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                                    <img
                                        src={link.icon}
                                        alt={link.name}
                                        className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105 relative z-10"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Quick Links */}
                    <div className="footer-section">
                        <h4 className="font-bold mb-4 text-dark-turquoise relative pb-2">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-dark-turquoise"></span>
                        </h4>
                        <ul className="space-y-2">
                            {['Home', 'Shop', 'Categories', 'Blog', 'About', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href={`/${link.toLowerCase()}`} className="text-gray-300 hover:text-dark-turquoise transition-all duration-300 hover:translate-x-2 inline-block">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 3: Customer Service */}
                    <div className="footer-section">
                        <h4 className="font-bold mb-4 text-dark-turquoise relative pb-2">
                            Customer Service
                            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-dark-turquoise"></span>
                        </h4>
                        <ul className="space-y-2">
                            {['Size Guide', 'Shipping & Returns', 'Care Instructions', 'Custom Orders', 'FAQ', 'Support Center'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-300 hover:text-dark-turquoise transition-all duration-300 hover:translate-x-2 inline-block">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 4: Contact Information */}
                    <div className="footer-section">
                        <h4 className="font-bold mb-4 text-dark-turquoise relative pb-2">
                            Contact Information
                            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-dark-turquoise"></span>
                        </h4>
                        <div className="space-y-3 text-gray-300">
                            <p className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-dark-turquoise"></i> 123 Fashion Avenue, London, UK</p>
                            <p className="flex items-center gap-2"><i className="fas fa-phone text-dark-turquoise"></i> +44 20 7123 4567</p>
                            <p className="flex items-center gap-2"><i className="fas fa-envelope text-dark-turquoise"></i> hello@infinipets.com</p>
                            <p className="flex items-center gap-2"><i className="fas fa-clock text-dark-turquoise"></i> Mon-Fri: 9AM-6PM GMT</p>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; 2024 INFINIPETS. All rights reserved. | Privacy Policy | Terms of Service</p>
                </div>
            </div>
        </footer>
    );
}