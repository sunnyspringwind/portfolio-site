import { useState, type ChangeEvent } from "react";
import { Send, User, Mail, MessageSquare, FileText } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// regex patterns for validations
const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  name: /^[a-zA-Z\s]{2,50}$/,
  subject: /^.{3,100}$/,
  message: /^.{10,500}$/,
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear errors when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateFormData = (
    formData: FormData
  ): { isValid: boolean; errors: ValidationErrors } => {
    const newErrors: ValidationErrors = {};

    // name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!patterns.name.test(formData.name.trim())) {
      newErrors.name =
        "Name must be 2-50 characters long and contain only letters and spaces";
    }

    // email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!patterns.email.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (!patterns.subject.test(formData.subject.trim())) {
      newErrors.subject = "Subject must be 3-100 characters long";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (!patterns.message.test(formData.message.trim())) {
      newErrors.message = "Message must be 10-500 characters long";
    }
    
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validation = validateFormData(formData);
    
    if (validation.isValid) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Form is valid", formData);
      
      // Reset form on successful submission
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // You can add success notification here
    } else {
      setErrors(validation.errors);
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="bg-black text-white min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-16">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold my-10 md:mb-4 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Drop me a message and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-green-400 mb-6">Let's Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">aaseslimbu2@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-medium">Available Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-gray-700 focus:border-green-500 focus:ring-green-500/50'
                  }`}
                  placeholder="Your full name"
                  required
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-gray-700 focus:border-green-500 focus:ring-green-500/50'
                  }`}
                  placeholder="your.email@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.subject 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-gray-700 focus:border-green-500 focus:ring-green-500/50'
                  }`}
                  placeholder="What's this about?"
                  required
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-gray-700 focus:border-green-500 focus:ring-green-500/50'
                  }`}
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  required
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-500 text-black font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;