import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { hstyle, ipstyle, styles } from '../Auth/style';
import "./dashboard.css"

const Dashboard = () => {

  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState("");
  const [karmaScores, setKarmaScores] = useState({});

  const logout = (navigate) => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleform=(formData)=>{
    const data=Object.fromEntries(formData.entries());
    console.log(data);
  }

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5173/dashboard", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  const handleAddComplaint = async () => {
    try {
      const response = await fetch("http://localhost:5173/dashboard", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: newComplaint }),
      });

      if (response.ok) {
        const newComplaintData = await response.json();
        setComplaints([...complaints, newComplaintData]);
        setNewComplaint("");
      } else {
        alert("Failed to submit complaint");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVote = async (id, vote) => {
    try {
      const response = await fetch(`http://localhost:5173/dashboard/${id}/vote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ vote }),
      });

      if (response.ok) {
        const updatedComplaint = await response.json();
        setComplaints(
          complaints.map((complaint) =>
            complaint._id === id ? { ...complaint, votes: updatedComplaint.votes } : complaint
          )
        );
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div>
      <h1 style={hstyle}>Dashboard - Protected Route</h1>
      <button onClick={() => logout(navigate)} style={{cursor:"pointer",color:"gray",fontStyle:"italic"}}>Logout</button>

<div style={styles}>
      <h2>Complaint Logging</h2>

      <form action={handleform}>
      <input
        type="text"
        placeholder="Enter your complaint"
        value={newComplaint}
        onChange={(e) => setNewComplaint(e.target.value)}
        style={ipstyle}
      />
      {newComplaint && <button style={{cursor:"pointer",marginLeft:"20px",backgroundColor:"gray",color:"white",padding:"5px",borderRadius:"15px"}} onClick={handleAddComplaint}>Submit Complaint</button>}
      </form>
</div>

      <h2 style={{marginTop:"20px"}}>Complaint List</h2>
      <ul className='page-wrapper'>
        {complaints.map((complaint) => (
          <li key={complaint.id} className='fancy-shadow-card'>
            {complaint.text} - Votes: {complaint.votes}
            <button onClick={() => handleVote(complaint.id, 1)}>👍</button>
            <button onClick={() => handleVote(complaint.id, -1)}>👎</button>
          </li>
        ))}
      </ul>

      <h2 style={{marginTop:"50px"}}>Leaderboard</h2>
      <ul>
        {Object.entries(karmaScores).map(([user, score]) => (
          <li key={user}>{user}: {score} Karma Points</li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard