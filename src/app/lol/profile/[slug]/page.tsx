'use client';

import { useEffect, useState } from 'react';
import { LoLProfile } from '@/app/parsers/LoLProfile';

interface ProfileData {
  status_code: number;
  message: string;
  // Request Info
  puuid: string;
  gamename: string;
  gametag: string;
  // Account Info
}

const LoLProfilePage = ({ params }) => {

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
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
        setError(error.message);
      }
    };

    if (gamename && gametag) {
      fetchProfile();
    }
  }, [gamename, gametag]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Trying to Find Riot Profile for {gamename}#{gametag}</div>;
  }

  if (profileData.status_code === 200) {
    return <h1>Found Riot Profile of {gamename}#{gametag} (Player UID: {profileData.puuid})</h1>;
  }

  return (
    <div>
      <h1>No Riot Profile Found for {gamename}#{gametag}</h1>
    </div>
  );
};

export default LoLProfilePage;
