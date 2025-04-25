"use client"
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Lock, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const Settings = () => {
  const [notification, setNotification] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    level: "",
    learningPace: "",
    areasOfInterest: "",
    profilePic: "",
    city: "",
    state: ""
  });

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/fetchUserById/${user.id}`);
        console.log(response)
        setUserData(response.data.data);
        setFormData({
          name: response.data.data.name || "",
          mobileNumber: response.data.data.mobileNumber || "",
          level: response.data.data.level || "",
          learningPace: response.data.data.learningPace || "",
          areasOfInterest: response.data.data.areasOfInterest ? response.data.data.areasOfInterest.join(", ") : "",
          profilePic: response.data.data.profilePic || "",
          city: response.data.data.city || "",
          state: response.data.data.state || ""
        });
        setLoading(false);
      } catch (error) {
        showToast("Failed to fetch user data", 'error');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFileUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const uploadResponse = await axios.post("http://localhost:8000/api/v1/courses/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(uploadResponse);

      setUserData(prev => prev ? { ...prev, profilePic: uploadResponse.data } : null);
      showToast("Profile picture updated successfully");
    } catch (error) {
      showToast("Failed to upload profile picture", 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.patch("http://localhost:8000/api/v1/users/updateUserById/680538fb67ba1fb79faf35d0", {
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        level: formData.level,
        learningPace: formData.learningPace,
        areasOfInterest: formData.areasOfInterest.split(",").map(item => item.trim()),
        profilePic: userData.profilePic,
        city: formData.city,
        state: formData.state
      });
      showToast("Profile updated successfully");
    } catch (error) {
      showToast("Failed to update profile", 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-purple-600" />
      </div>
    );
  }

  if (!userData) {
    return <div>Failed to load user data</div>;
  }

  return (
    <div className="md:w-[80%] w-[95%] mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-semibold mb-6 border-b pb-4">Settings</h1>

      <form onSubmit={handleSubmit}>
        <section className="mb-8">
          <h2 className="text-xl font-medium mb-4">Personal Info</h2>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <div className="flex flex-col items-center relative">
              <img
                src={userData.profilePic || "https://cdn-icons-png.flaticon.com/512/147/147144.png"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <label htmlFor="profile-upload" className="absolute -bottom-2 right-0 bg-white p-1 rounded-full cursor-pointer">
                <Upload className="h-5 w-5 text-purple-600" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <Loader2 className="animate-spin h-6 w-6 text-white" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full name</label>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <Input 
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <Input 
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div> */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <Input value={userData.email} disabled />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  <Lock size={17}/>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <Input 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <Input 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Skill Level</label>
              <Input 
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                placeholder="e.g. Intermediate"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Learning Pace</label>
              <Input 
                name="learningPace"
                value={formData.learningPace}
                onChange={handleInputChange}
                placeholder="e.g. Relaxed"
                disabled
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Areas of Interest (comma separated)</label>
            <Input 
              name="areasOfInterest"
              value={formData.areasOfInterest}
              onChange={handleInputChange}
              placeholder="e.g. Math, Science, History"
            />
          </div>
        </section>

        {/* Rest of your form remains the same */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-gray-500">Notifications about product updates, company notes, etc.</p>
            </div>
            <Switch 
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Reminders / General</p>
              <p className="text-sm text-gray-500">Reminders to encourage you to keep studying</p>
            </div>
            <Switch 
              checked={reminders}
              onCheckedChange={setReminders}
            />
          </div>
        </div>

        <div className="my-8">
          <h2 className="text-xl font-semibold mb-2">Reset your password</h2>
          <p className="text-sm text-gray-500 mb-4">
            Forgot your password, or just want to change it? Just click below.
          </p>
          <Link href={"/auth/verify-email"} className="px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium rounded-md hover:bg-purple-50 transition">
            Reset password
          </Link>
        </div>

        <div className="my-8">
          <h2 className="text-xl font-semibold mb-2">Delete account</h2>
          <p className="text-sm text-gray-500 mb-4">
            We will archive your accounts for 30 days before permanently deleting it, and all information associated with your account.
          </p>
          <button 
          disabled={true}
            type="button"
            className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition"
          >
            Delete account
            
          </button>
        </div>

        <div className="flex justify-end mt-10">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Saving...
              </>
            ) : "Save"}
          </Button>
        </div>
      </form>
      
      {notification && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {notification.message}
          <button 
            onClick={() => setNotification(null)}
            className="ml-4"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;