import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Settings,
  MessageSquare,
  AlertCircle,
  Send,
} from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ContactPopup = ({
  buttonText = "Contact Us",
  buttonClassName = "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    subService: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "https://dashboard.digitalnawab.com/api/get_service",
          headers: {},
        };
        const response = await axios.request(config);
        setServices(response.data || []);
      } catch (error) {
        // toast.error("Failed to fetch services");
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Update subservices when service changes
  useEffect(() => {
    if (formData.service) {
      const selectedService = services.find((s) => s.name === formData.service);
      setSubServices(selectedService ? selectedService.subservices || [] : []);
      setFormData((prev) => ({ ...prev, subService: "" }));
    } else {
      setSubServices([]);
    }
  }, [formData.service, services]);

  // Validate form fields
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!/^[a-zA-Z\s]+$/.test(value) && value !== "") {
          error = "Name should only contain letters and spaces";
        } else if (value.length < 2 && value !== "") {
          error = "Name must be at least 2 characters";
        }
        break;
      case "phone":
        if (!/^\d+$/.test(value) && value !== "") {
          error = "Phone number should only contain digits";
        } else if (value.length !== 0 && value.length !== 10) {
          error = "Phone number must be exactly 10 digits";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value !== "") {
          error = "Please enter a valid email address";
        }
        break;
      default:
        break;
    }

    return error;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent invalid input
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }

    // Validate and set errors
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Validate all fields
  const newErrors = {};
  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) newErrors[key] = error;
    if (!formData[key] && key !== "subService") {
      newErrors[key] = "This field is required";
    }
  });

  if (formData.service && !formData.subService) {
    newErrors.subService = "Please select a specific service";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    try {
      const selectedService = services.find(
        (s) => s.name === formData.service
      );
      const selectedSubService = subServices.find(
        (s) => s.name === formData.subService
      );

      const payload = {
        name: formData.name,
        email: formData.email,
        number: formData.phone,
        city: formData.city,
        service_id: selectedService ? selectedService.id : (services[0]?.id || 4),
        subservice_id: selectedSubService ? selectedSubService.id : (selectedService?.subservices?.[0]?.id || 3),
        message: formData.message,
      };

      const response = await axios.post(
        "https://dashboard.digitalnawab.com/api/post_enquiry",
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Enquiry submitted successfully!");

      // Reset form + close popup
      resetForm();
      setIsOpen(false);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // backend validation errors
        setErrors(error.response.data.errors);
        toast.error("Please fix the highlighted errors.");
      } else {
        toast.error("Failed to submit enquiry");
      }
      console.error("Submission error:", error);
    }
  }

  setIsSubmitting(false);
};


  // Reset form when closing
  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      city: "",
      service: "",
      subService: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <>
      <Toaster position="top-right" />
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={buttonClassName}
          >
            {buttonText}
          </motion.button>
        </DialogTrigger>

        <DialogContent className="max-w-xl bg-white rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Get in Touch
            </DialogTitle>
            <p className="text-gray-600 text-sm">
              Fill out the form below, and we'll respond within 24 hours.
            </p>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 grid grid-cols-2 gap-x-4"
          >
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <User className="w-4 h-4 text-indigo-600" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 rounded-lg border-2 text-black ${
                  errors.name ? "border-red-300" : "border-gray-200"
                } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 placeholder-gray-400`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Phone className="w-4 h-4 text-indigo-600" />
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                maxLength={10}
                className={`w-full px-4 py-2 rounded-lg border-2 text-black ${
                  errors.phone ? "border-red-300" : "border-gray-200"
                } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 placeholder-gray-400`}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4 text-indigo-600" />
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg border-2 text-black ${
                  errors.email ? "border-red-300" : "border-gray-200"
                } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 placeholder-gray-400`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </motion.div>

            {/* City */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-indigo-600" />
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                className="w-full px-4 py-2 rounded-lg border-2 text-black border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 placeholder-gray-400"
                required
              />
            </motion.div>

            {/* Service Category */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="col-span-2"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Settings className="w-4 h-4 text-indigo-600" />
                Service Category <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border-2 text-black border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 text-gray-900"
                required
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Specific Service */}
            {formData.service && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="col-span-2"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Settings className="w-4 h-4 text-indigo-600" />
                  Specific Service <span className="text-red-500">*</span>
                </label>
                <select
                  name="subService"
                  value={formData.subService}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border-2 text-black ${
                    errors.subService ? "border-red-300" : "border-gray-200"
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 text-gray-900`}
                  required
                >
                  <option value="">Select a specific service</option>
                  {subServices.map((subService) => (
                    <option key={subService.id} value={subService.name}>
                      {subService.name}
                    </option>
                  ))}
                </select>
                {errors.subService && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.subService}
                  </p>
                )}
              </motion.div>
            )}

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="col-span-2"            >
              
            
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                Project Details <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Describe your project requirements..."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border-2 text-black border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 resize-none"
                required
              />
            </motion.div>

            {/* Privacy Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="text-center text-sm text-gray-600 col-span-2"
            >
              <p>🔒 Your information is secure and confidential.</p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="flex gap-3 col-span-2"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                // onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Send Request
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactPopup;
