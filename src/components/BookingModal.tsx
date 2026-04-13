import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tourPackage?: string;
  tourDetails?: string;
}

const BookingModal = ({ isOpen, onOpenChange, tourPackage, tourDetails }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: "1",
    preferredDate: "",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map the generic fields to the Google Apps Script expected fields
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        travelers: formData.travelers,
        preferredDate: formData.preferredDate,
        // Using special requests for both address and referral source as a fallback
        // since the UI doesn't have these explicitly
        address: formData.specialRequests || "Not Provided",
        referralSource: "Website",
        tourPackage: tourPackage || "General Inquiry",
      };

      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwXtlVfzBhhWjLy1EUdv2Fya5oTdW5mze6pAUAYsWK4J8-BYGq6xhllan-01qUWvemmkw/exec"; // NOTE: Replace this URL

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // This is required for Google Apps Script to not throw CORS errors
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      toast.success("Booking request sent successfully! We'll get back to you soon.");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        travelers: "1",
        preferredDate: "",
        specialRequests: "",
      });

      onOpenChange(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-background border-none shadow-2xl rounded-2xl">
        <div className="px-6 pt-6 pb-2">
          <DialogHeader className="space-y-1">
            <DialogTitle className="font-display text-2xl font-bold flex items-center justify-between">
              Book Your Pilgrimage
            </DialogTitle>
            {(tourPackage || tourDetails) && (
              <DialogDescription className="font-display font-medium text-foreground">
                {tourPackage} {tourDetails && <span className="text-muted-foreground font-body font-normal">- {tourDetails}</span>}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-xs">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="h-10 focus-visible:ring-saffron"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="h-10 focus-visible:ring-saffron"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-xs">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                required
                className="h-10 focus-visible:ring-saffron"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="travelers" className="text-xs">Number of Travelers *</Label>
              <Input
                id="travelers"
                name="travelers"
                type="number"
                min="1"
                value={formData.travelers}
                onChange={handleChange}
                required
                className="h-10 focus-visible:ring-saffron"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="preferredDate" className="text-xs">Preferred Travel Date</Label>
            <div className="relative">
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleChange}
                className="h-10 focus-visible:ring-saffron [color-scheme:light]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="specialRequests" className="text-xs">Special Requests</Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any special requirements, dietary restrictions, mobility needs, etc."
              rows={3}
              className="resize-none focus-visible:ring-saffron"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6 rounded-md font-body flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 bg-gradient-hero text-white hover:opacity-90 rounded-md font-body flex-1 border-none"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
