import { useEffect, useState } from "react";
import DisplayBusiness from "../../components/superadmin/DisplayBusiness";
import SuperadminLayout from "../../layouts/superadmin/SuperadminLayout";
import { fetchBusinesses } from "../../services/businessApi";
import AddBusiness from "../../dialogform/AddBusiness";

const Onboarding = () => {
  const [businesses, setBusinesses] = useState([]);

  const [error, setError] = useState(null);
  const [generatedLink, setGeneratedLink] = useState(null);
  const [linkGenerated, setLinkGenerated] = useState(false);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const businessesData = await fetchBusinesses();
        setBusinesses(businessesData);
      } catch (error) {
        setError("Failed to fetch businesses: " + error);
      }
    };

    getBusinesses();
  }, []);

  const sendInvitation = async (businessId) => {
    // Call the backend to send an invitation
    try {
      const response = await axios.post(
        "http://localhost:3000/superadmin/send-invitation",
        { businessId, email: "example@business.com" }, // Add the email field
        {
          withCredentials: true,
        }
      );
      alert("Invitation sent successfully!", response.success);
    } catch (error) {
      alert("Failed to send invitation.", error);
    }
  };

  return (
    <SuperadminLayout>
      <DisplayBusiness
        businesses={businesses}
        setBusinesses={setBusinesses}
        setLinkGenerated={setLinkGenerated}
        setGeneratedLink={setGeneratedLink}
        generatedLink={generatedLink}
        linkGenerated={linkGenerated}
      />
      <AddBusiness setBusinesses={setBusinesses} />
    </SuperadminLayout>
  );
};

export default Onboarding;
