import { useState } from "react";
import axios from "axios";

const InvitationForm = () => {
  const [businessId, setBusinessId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/superadmin/send-invitation", {
        businessId,
        email,
      });
      alert("Invitation sent successfully");
    } catch (err) {
      setError("Failed to send invitation", err);
    }
  };

  return (
    <div>
      <h2>Send Invitation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="businessId">Business ID</label>
          <input
            type="text"
            id="businessId"
            name="businessId"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <div>{error}</div>}

        <button type="submit">Send Invitation</button>
      </form>
    </div>
  );
};

export default InvitationForm;
