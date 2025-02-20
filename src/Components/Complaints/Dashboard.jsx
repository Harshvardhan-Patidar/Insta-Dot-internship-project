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
    const data=Object.formEntries(formData.entries);
    console.log(data);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setComplaints((prevComplaints) =>
        prevComplaints.filter(
          (complaint) => !(complaint.votes < 0 && Date.now() - complaint.timestamp > 259200000)
        )
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAddComplaint = () => {
    setComplaints([...complaints, { id: complaints.length + 1, text: newComplaint, votes: 0, timestamp: Date.now() }]);
    setNewComplaint("");
  };

  const handleVote = (id, change) => {
    setComplaints(
      complaints.map((complaint) => {
        if (complaint.id === id) {
          const newVotes = complaint.votes + change;
          const user = "user1"; // Dummy user for now
          setKarmaScores((prevScores) => ({
            ...prevScores,
            [user]: (prevScores[user] || 0) + (change > 0 ? 1 : -1),
          }));
          return { ...complaint, votes: newVotes };
        }
        return complaint;
      })
    );
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