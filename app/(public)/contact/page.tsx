import ContactForm from "@/app/_components/ContactForm";
import { Mail, MessageSquare, MapPin } from "lucide-react";


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Have a question or just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Email us</h3>
                <p className="text-slate-500 text-sm">support@yourproject.com</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Live Chat</h3>
                <p className="text-slate-500 text-sm">Available Mon-Fri, 9am-5pm</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Office</h3>
                <p className="text-slate-500 text-sm">123 Tech Lane, San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}