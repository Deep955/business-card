import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure you have Tailwind CSS set up

import { 
  Mail, Phone, MapPin, Linkedin, Github, Twitter, Download, Share2, 
  ExternalLink, User, MessageCircle, Calendar, Award, TrendingUp, Star,
  ChevronRight, Bell, Settings, Heart, Camera, QrCode, Plus, Check,
  Instagram, Facebook, Globe
} from 'lucide-react';

export default function OptimizedBusinessCard() {
  const [currentScreen, setCurrentScreen] = useState('profile');
  const [isSharing, setIsSharing] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isOnline, setIsOnline] = useState(true);
  const [showSaveFloat, setShowSaveFloat] = useState(true);
  const [contactSaved, setContactSaved] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const screens = {
    profile: 'Profile',
    about: 'About',
    portfolio: 'Portfolio',
    contact: 'Contact',
    social: 'Social'
  };

  const contactInfo = {
    name: "Alex Rodriguez",
    username: "@alexdev",
    title: "Senior Full Stack Developer",
    company: "TechVision Solutions",
    email: "alex.rodriguez@techvision.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexrodriguez.dev",
    bio: "Passionate developer creating digital experiences that matter. 5+ years building scalable applications.",
    followers: "2.4K",
    following: "892",
    projects: "47",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  const skills = [
    { name: "React", level: 95, projects: 23, color: "bg-blue-500" },
    { name: "Node.js", level: 90, projects: 19, color: "bg-green-500" },
    { name: "TypeScript", level: 88, projects: 21, color: "bg-blue-600" },
    { name: "Python", level: 85, projects: 15, color: "bg-yellow-500" },
    { name: "AWS", level: 80, projects: 12, color: "bg-orange-500" },
    { name: "GraphQL", level: 75, projects: 8, color: "bg-pink-500" }
  ];

  const recentProjects = [
    { name: "E-commerce Platform", tech: "React, Node.js", status: "Live", color: "bg-green-500", url: "https://example.com" },
    { name: "AI Dashboard", tech: "Python, React", status: "Beta", color: "bg-blue-500", url: "https://example.com" },
    { name: "Mobile App API", tech: "Node.js, GraphQL", status: "Development", color: "bg-yellow-500", url: "https://example.com" }
  ];

  const socialPlatforms = [
    { 
      platform: "GitHub", 
      username: "@alexdev", 
      followers: "1.2K", 
      engagement: "+12%", 
      icon: Github, 
      color: "from-gray-700 to-gray-900",
      url: "https://github.com/alexdev"
    },
    { 
      platform: "LinkedIn", 
      username: "alex-rodriguez-dev", 
      followers: "3.4K", 
      engagement: "+8%", 
      icon: Linkedin, 
      color: "from-blue-600 to-blue-800",
      url: "https://linkedin.com/in/alex-rodriguez-dev"
    },
    { 
      platform: "Twitter", 
      username: "@alexdev", 
      followers: "892", 
      engagement: "+15%", 
      icon: Twitter, 
      color: "from-blue-400 to-blue-600",
      url: "https://twitter.com/alexdev"
    },
    { 
      platform: "Instagram", 
      username: "@alex.codes", 
      followers: "1.8K", 
      engagement: "+20%", 
      icon: Instagram, 
      color: "from-pink-500 to-orange-500",
      url: "https://instagram.com/alex.codes"
    },
    { 
      platform: "Dribbble", 
      username: "alexdesigns", 
      followers: "654", 
      engagement: "+10%", 
      icon: Globe, 
      color: "from-pink-400 to-rose-500",
      url: "https://dribbble.com/alexdesigns"
    },
    { 
      platform: "Facebook", 
      username: "Alex Rodriguez", 
      followers: "2.1K", 
      engagement: "+5%", 
      icon: Facebook, 
      color: "from-blue-500 to-blue-700",
      url: "https://facebook.com/alex.rodriguez.dev"
    }
  ];

  const whatsappNumber = "15551234567"; // Without + sign for WhatsApp URL

  const handleScreenChange = (newScreen) => {
    if (newScreen === currentScreen) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(newScreen);
      setIsTransitioning(false);
    }, 150);
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${contactInfo.name} - ${contactInfo.title}`,
          text: `Connect with ${contactInfo.name} at ${contactInfo.company}`,
          url: `https://${contactInfo.website}`
        });
      } else {
        await navigator.clipboard.writeText(`${contactInfo.name} - ${contactInfo.email}`);
        alert('Contact info copied to clipboard!');
      }
    } catch (err) {
      console.log('Share cancelled or failed');
    }
    setIsSharing(false);
  };

  const handleDownload = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
ORG:${contactInfo.company}
TITLE:${contactInfo.title}
EMAIL:${contactInfo.email}
TEL:${contactInfo.phone}
URL:https://${contactInfo.website}
END:VCARD`;
    
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contactInfo.name.replace(' ', '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleSaveContact = () => {
    setContactSaved(true);
    handleDownload();
    setTimeout(() => {
      setShowSaveFloat(false);
    }, 2000);
  };

  const handleNotificationClick = () => {
    setNotifications(0);
    alert('Notifications cleared!');
  };

  const handleSettingsClick = () => {
    alert('Settings opened!');
  };

  const handleProjectClick = (project) => {
    window.open(project.url, '_blank');
  };

  const handleSocialClick = (social) => {
    window.open(social.url, '_blank');
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi ${contactInfo.name}! I found your profile and would like to connect.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleScheduleMeeting = () => {
    const subject = encodeURIComponent(`Meeting Request - ${contactInfo.name}`);
    const body = encodeURIComponent(`Hi ${contactInfo.name},\n\nI would like to schedule a meeting with you.\n\nBest regards`);
    window.open(`mailto:${contactInfo.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const AppHeader = () => (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">{screens[currentScreen]}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={handleNotificationClick}
          className="relative p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          <Bell className="w-5 h-5 text-white/80" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {notifications}
            </span>
          )}
        </button>
        <button 
          onClick={handleSettingsClick}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          <Settings className="w-5 h-5 text-white/80" />
        </button>
      </div>
    </div>
  );

  const TabBar = () => (
    <div className="sticky bottom-0 flex justify-around items-center py-4 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      {Object.entries(screens).map(([key, label]) => {
        const IconComponent = {
          profile: User,
          about: Award,
          portfolio: TrendingUp,
          contact: MessageCircle,
          social: Share2
        }[key];

        return (
          <button
            key={key}
            onClick={() => handleScreenChange(key)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              currentScreen === key 
                ? 'text-blue-400 bg-blue-500/20 scale-105' 
                : 'text-white/60 hover:text-white/80 hover:bg-white/10'
            }`}
          >
            <IconComponent className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );

  const FloatingSaveButton = () => {
    if (!showSaveFloat) return null;
    
    return (
      <button
        onClick={handleSaveContact}
        className={`fixed bottom-20 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50 ${
          contactSaved 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl hover:scale-110'
        }`}
      >
        {contactSaved ? (
          <Check className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </button>
    );
  };

  const ProfileScreen = () => (
    <div className={`flex-1 px-6 py-6 space-y-6 transition-all duration-300 ${
      isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
    }`}>
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <img 
            src={contactInfo.avatar} 
            alt={contactInfo.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-white/20"
          />
          <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 border-black ${
            isOnline ? 'bg-green-500' : 'bg-gray-500'
          }`}></div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-1">{contactInfo.name}</h2>
        <p className="text-blue-400 font-medium mb-1">{contactInfo.username}</p>
        <p className="text-white/60 text-sm mb-4">{contactInfo.title}</p>
        
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="text-xl font-bold text-white">{contactInfo.projects}</p>
            <p className="text-white/60 text-xs">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">{contactInfo.followers}</p>
            <p className="text-white/60 text-xs">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">{contactInfo.following}</p>
            <p className="text-white/60 text-xs">Following</p>
          </div>
        </div>

        <div className="flex gap-3 justify-center mb-4">
          <button 
            onClick={() => window.open(`mailto:${contactInfo.email}`, '_blank')}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all max-w-32"
          >
            <MessageCircle className="w-4 h-4" />
            Message
          </button>
          <button 
            onClick={handleWhatsAppClick}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all max-w-32"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
        <p className="text-white/80 text-sm leading-relaxed">{contactInfo.bio}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={handleShare}
          disabled={isSharing}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-white font-medium text-sm">Share Profile</p>
            <p className="text-white/60 text-xs">Send to contacts</p>
          </div>
        </button>
        
        <button 
          onClick={handleDownload}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-white font-medium text-sm">Save Contact</p>
            <p className="text-white/60 text-xs">Add to phone</p>
          </div>
        </button>
      </div>
    </div>
  );

  const AboutScreen = () => (
    <div className={`flex-1 px-6 py-6 space-y-6 transition-all duration-300 ${
      isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
    }`}>
      <div className="text-center mb-6">
        <Award className="w-12 h-12 text-blue-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">Skills & Expertise</h3>
        <p className="text-white/60 text-sm">Technologies I work with daily</p>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.name} className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                <span className="text-white font-medium">{skill.name}</span>
              </div>
              <div className="text-right">
                <p className="text-white text-sm font-medium">{skill.level}%</p>
                <p className="text-white/60 text-xs">{skill.projects} projects</p>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className={`h-2 ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PortfolioScreen = () => (
    <div className={`flex-1 px-6 py-6 space-y-6 transition-all duration-300 ${
      isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
    }`}>
      <div className="text-center mb-6">
        <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">Recent Projects</h3>
        <p className="text-white/60 text-sm">Latest work and achievements</p>
      </div>

      <div className="space-y-4">
        {recentProjects.map((project, index) => (
          <button
            key={project.name}
            onClick={() => handleProjectClick(project)}
            className="w-full bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${project.color} rounded-xl flex items-center justify-center`}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-medium">{project.name}</h4>
                  <p className="text-white/60 text-sm">{project.tech}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'Beta' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {project.status}
                </span>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-4 border border-blue-500/20">
        <div className="flex items-center gap-3 mb-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-medium">Featured Achievement</span>
        </div>
        <p className="text-white/80 text-sm">Led a team of 5 developers to build a scalable e-commerce platform serving 10K+ users</p>
      </div>
    </div>
  );

  const ContactScreen = () => (
    <div className={`flex-1 px-6 py-6 space-y-6 transition-all duration-300 ${
      isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
    }`}>
      <div className="text-center mb-6">
        <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">Get In Touch</h3>
        <p className="text-white/60 text-sm">Let's build something amazing together</p>
      </div>

      <div className="space-y-4">
        <a href={`mailto:${contactInfo.email}`} className="block">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Email</p>
                <p className="text-white/60 text-sm">{contactInfo.email}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
            </div>
          </div>
        </a>

        <a href={`tel:${contactInfo.phone}`} className="block">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Phone</p>
                <p className="text-white/60 text-sm">{contactInfo.phone}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
            </div>
          </div>
        </a>

        <button 
          onClick={handleWhatsAppClick}
          className="w-full bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-medium">WhatsApp</p>
              <p className="text-white/60 text-sm">Send a quick message</p>
            </div>
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
          </div>
        </button>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Location</p>
              <p className="text-white/60 text-sm">{contactInfo.location}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={handleScheduleMeeting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          <Calendar className="w-5 h-5" />
          Schedule a Meeting
        </button>
      </div>
    </div>
  );

  const SocialScreen = () => (
    <div className={`flex-1 px-6 py-6 space-y-6 transition-all duration-300 ${
      isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
    }`}>
      <div className="text-center mb-6">
        <Share2 className="w-12 h-12 text-pink-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">Social Presence</h3>
        <p className="text-white/60 text-sm">Connect across platforms</p>
      </div>

      <div className="space-y-4">
        {socialPlatforms.map((social, index) => (
          <button
            key={social.platform}
            onClick={() => handleSocialClick(social)}
            className="w-full bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center`}>
                  <social.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">{social.platform}</p>
                  <p className="text-white/60 text-sm">{social.username}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-sm font-medium">{social.followers}</p>
                <p className="text-green-400 text-xs">{social.engagement}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-white/60 text-xs">High engagement</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-4 border border-purple-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">QR Code</span>
          </div>
          <button 
            onClick={() => alert('QR Code generated! (Demo)')}
            className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            Generate
          </button>
        </div>
        <p className="text-white/60 text-sm">Share your profile instantly</p>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch(currentScreen) {
      case 'profile': return <ProfileScreen />;
      case 'about': return <AboutScreen />;
      case 'portfolio': return <PortfolioScreen />;
      case 'contact': return <ContactScreen />;
      case 'social': return <SocialScreen />;
      default: return <ProfileScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4">
      <div className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="flex flex-col min-h-screen">
          <AppHeader />
          {renderScreen()}
          <TabBar />
        </div>
        <FloatingSaveButton />
      </div>
    </div>
  );
}