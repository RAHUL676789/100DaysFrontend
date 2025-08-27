import React, { useState, useRef } from "react";

const PasswordSuggestion = () => {
  const [passValue, setPassValue] = useState("");
  const [passStrength, setPassStrength] = useState(null);
  const timeRef = useRef(null);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const spclChar = "!@#$%^&*()_+";

  const [showPass, setShowPass] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(null);

  // ✅ Debounce to reduce frequent calls
  const debounce = (func, value) => {
    if (timeRef.current) clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => func(value), 800);
  };

  const handlePassChange = (e) => {
    setPassValue(e.target.value);
    debounce(strengthChecker, e.target.value);
  };

  // ✅ Strength Checker
  const strengthChecker = (value) => {
    let score = 0;

    if (value.length >= 12) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[!@#$%^&*()_+]/.test(value)) score++;

    if (score < 2) {
      setPassStrength("weak");
      generateStrongPassword();
    } else if (score < 4) {
      setPassStrength("moderate");
      generateStrongPassword();
    } else if (score >= 4) {
      setPassStrength("strong");
      setGeneratePassword(null);
    }
  };

  // ✅ Strong Password Generator
  const generateStrongPassword = () => {
    const passString = alphabet + digits + spclChar;
    let password = "";
    for (let i = 0; i < 12; i++) {
      let random = Math.floor(Math.random() * passString.length);
      password += passString.charAt(random);
    }
    setGeneratePassword(password);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatePassword);
    alert("Password copied!");
  };

  // ✅ Strength color mapping
  const getStrengthColor = () => {
    if (passStrength === "weak") return "text-red-500";
    if (passStrength === "moderate") return "text-yellow-500";
    if (passStrength === "strong") return "text-green-600";
    return "text-gray-500";
  };

  return (
    <div className="w-[500px] rounded-lg mx-auto translate-y-12 bg-white shadow-lg px-6 py-6">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Password Strength & Suggestion
      </h1>

      <p className="text-sm text-gray-500 mb-2">
        Password should contain <span className="font-semibold">A–Z</span>,{" "}
        <span className="font-semibold">a–z</span>,{" "}
        <span className="font-semibold">0–9</span> and{" "}
        <span className="font-semibold">special characters</span>.
      </p>

      {/* Toggle Show/Hide */}
      <button
        onClick={() => setShowPass((prev) => !prev)}
        className="mb-3 px-4 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
      >
        {showPass ? "Hide Password" : "Show Password"}
      </button>

      <div className="flex flex-col gap-3">
        <label className="font-semibold text-lg" htmlFor="password">
          Enter Password
        </label>
        <input
          onChange={handlePassChange}
          value={passValue}
          placeholder="Enter your password"
          type={showPass ? "text" : "password"}
          id="password"
          className="bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Strength Display */}
        {passStrength && (
          <p className={`font-medium ${getStrengthColor()}`}>
            Strength: {passStrength}
          </p>
        )}

        {/* Suggestion Box */}
        {generatePassword && (
          <div className="flex items-center gap-3 mt-2">
            <input
              readOnly
              type="text"
              value={generatePassword}
              className="bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg w-full"
            />
            <button
              onClick={handleCopyPassword}
              className="px-4 py-2 font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordSuggestion;
