'use client';

import { useEffect, useState } from 'react';
import { LoLProfile } from '@/app/parsers/Riot/LoL/LoLProfile';

interface ProfileData {
  // Request Info
  puuid: string;
  gamename: string;
  gametag: string;
  matches: string[];
  // Account Info
}

const LoLProfilePage = ({ params }: { params: { slug: string } }) => {

  const [profileData, setProfileData] = useState<ProfileData>();
  const [error, setError] = useState("");

  let gamename = "";
  let gametag = "";

  if (params.slug) {
    [gamename, gametag] = params.slug.split('-');
  } else {
    setError("No slug provided");
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await LoLProfile(gamename, gametag);
        setProfileData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    if (gamename && gametag) {
      fetchProfile();
    }
  }, [gamename, gametag]);

  if (error) {
    return <div style={{margin: "20px"}}>Error: {error}</div>;
  }

  if (!profileData) {
    return <div style={{margin: "20px"}}>Trying to Find Riot Profile for <b>{decodeURIComponent(gamename)}#{gametag}</b></div>;
  }

  if (profileData.puuid) {
    return (
      <div style={{margin: "20px"}}>
        <h3>Found Riot Profile of {decodeURIComponent(gamename)}#{gametag}</h3>
        Player UID: {profileData.puuid}
        
        {profileData.matches.length === 0 ? (
          <h3 style={{marginTop: "20px"}}>No matches played recently.</h3>
        ) : (
          <>
            <h3 style={{marginTop: "20px"}}>Recently Played Matches</h3>
            <ul>
              {profileData.matches.map((match, index) => (
                <li key={index}>#{index + 1} Match ID: {match}</li>
              ))}
            </ul>
          </>
        )}

        
      </div>
    );
  }

  return (
    <div style={{margin: "20px"}}>
      <h3>No Riot Profile Found for {decodeURIComponent(gamename)}#{gametag}</h3>
    </div>
  );
};

export default LoLProfilePage;
