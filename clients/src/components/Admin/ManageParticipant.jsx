import { useState } from "react";
import axios from "axios";

export default function ManageParticipante() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    type: "user",
    name: "",
    email: "",
    id: "",
    password: "",
    role: "",
    members: [],
  });

  const [currentMember, setCurrentMember] = useState({
    type: "member",
    name: "",
    email: "",
    password: "",
    id: "",
    role: "",
  });

  const handleCurrentMemberChange = (e) => {
    const { name, value } = e.target;
    setCurrentMember({ ...currentMember, [name]: value });
  };

  const handleAddMember = () => {
    if (
      currentMember.name &&
      currentMember.email &&
      currentMember.password &&
      currentMember.role &&
      currentMember.id
    ) {
      setUserData((prevData) => ({
        ...prevData,
        members: [...prevData.members, currentMember],
      }));
      setCurrentMember({ name: "", email: "", password: "", id: "", role: "" }); // Clear input fields
    } else {
      alert("Please fill out all fields for the member.");
    }
  };

  const handleRemoveMember = (index) => {
    const members = userData.members.filter((_, i) => i !== index);
    setUserData({ ...userData, members });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/adduser",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status !== 200) {
        console.error("Error response:", response);
        setError(response.data.message || "Error creating Users, try again!");
        return; // Exit the function early
      }

      // If successful, process the data
      console.log("data", response.data);
      alert("Participants created successfully!");

      // Clear form data on success
      setUserData({
        type: "user",
        name: "",
        email: "",
        id: "",
        password: "",
        role: "",
        members: [],
      });
      setCurrentMember({
        type: "member",
        name: "",
        email: "",
        password: "",
        id: "",
        role: "",
      });
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false); // Ensure loading is set back to false
    }
  };

  return (
    <div className="bg-gray-300 p-8 rounded-lg shadow-lg max-w-lg m-auto mt-12 overflow-hidden">
      <h1 className="text-3xl font-semibold mb-6">Add Participant</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-2">User ID:</label>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={userData.id}
            onChange={(e) => setUserData({ ...userData, id: e.target.value })}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="useremail" className="block font-medium mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userpassword" className="block font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userrole" className="block font-medium mb-2">
            Role:
          </label>
          <select
            name="role"
            id="userrole"
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Role</option>
            <option value="supervisor">Supervisor</option>
            <option value="peers">Peers</option>
            <option value="juniors">Juniors</option>
            <option value="participant">Participant</option>
          </select>
        </div>

        <h3 className="text-xl font-semibold  mb-4">Add Members</h3>
        <div className="mb-4">
          <div className="mb-4">
            <label className="block font-medium mb-2">Member ID:</label>
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={currentMember.id}
              onChange={handleCurrentMemberChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <label className="block font-medium mb-2">Member Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={currentMember.name}
            onChange={handleCurrentMemberChange}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Member Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={currentMember.email}
            onChange={handleCurrentMemberChange}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Member Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={currentMember.password}
            onChange={handleCurrentMemberChange}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb- 2">Member Role:</label>
          <select
            name="role"
            value={currentMember.role}
            onChange={handleCurrentMemberChange}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Role</option>
            <option value="supervisor">Supervisor</option>
            <option value="peers">Peers</option>
            <option value="juniors">Juniors</option>
            <option value="participant">Participant</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleAddMember}
          className="bg-blue-500 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mb-4"
        >
          Add Member
        </button>

        <h3 className="text-xl font-semibold  mb-4">Added Members</h3>
        {userData.members.length > 0 ? (
          userData.members.map((member, index) => (
            <div key={index} className="bg-white p-4 rounded-md mb-2 shadow">
              <p>
                <strong>Name:</strong> {member.name}
              </p>
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>Role:</strong> {member.role}
              </p>
              <p>
                <strong>ID:</strong> {member.id}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveMember(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-300">No members added yet.</p>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
