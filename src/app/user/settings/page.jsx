"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Lock } from "lucide-react";
import Link from "next/link";



const Settings = () => {
    const [marketingEmails, setMarketingEmails] = useState(true);
  const [reminders, setReminders] = useState(true);
  return (
    <div className="md:w-[80%] w-[95%] mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
    <h1 className="text-2xl font-semibold mb-6 border-b pb-4">Settings</h1>

    <section className="mb-8">
      <h2 className="text-xl font-medium mb-4">Personal Info</h2>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button className="-mt-4 ml-12 text-purple-600 text-lg">+</button>
        </div>
        <div className="w-full">
          <div className="border rounded-lg h-32 md:h-40 flex flex-col justify-center items-center">
            <p className="text-sm mb-2">Recommended Ratio: 1500 x 500</p>
            <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
              Upload
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">First name</label>
          <Input defaultValue="Sarthak" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last name</label>
          <Input placeholder="Enter last name here" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Username</label>
        <Input defaultValue="drsaun" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <div className="relative">
          <Input defaultValue="drsaun07@gmail.com" disabled />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <Lock size={17}/>
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Birthday</label>
        <Input defaultValue="22 / 11 / 1993" />
      </div>
    </section>
    <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>

        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="font-medium">Marketing Emails</p>
            <p className="text-sm text-gray-500">Notifications about product updates, company notes, etc.</p>
          </div>
            <Switch w="w-[44px]"/>
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="font-medium">Reminders / General</p>
            <p className="text-sm text-gray-500">Reminders to encourage you to keep studying</p>
          </div>
          <div>
            <Switch w="w-[44px]"/>
          </div>
        </div>
      </div>

      {/* Section: Reset Password */}
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-2">Reset your password</h2>
        <p className="text-sm text-gray-500 mb-4">
          Forgot your password, or just want to change it? Just click below.
        </p>
        <Link href={"/verification/verify-email"} className="px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium rounded-md hover:bg-purple-50 transition">
          Reset password
        </Link>
      </div>

      {/* Section: Delete Account */}
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-2">Delete account</h2>
        <p className="text-sm text-gray-500 mb-4">
          We will archive your accounts for 30 days before permanently deleting it, and all information associated with your account.
        </p>
        <button className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition">
          Delete account
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-10">
        <button className="bg-purple-600 text-white px-8 py-2 rounded-md font-semibold hover:bg-purple-700 transition">
          Save
        </button>
      </div>
  </div>
  );
};

export default Settings;
