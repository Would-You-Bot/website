import Member from "@/components/types/member";

import Navbar from "@/components/Navbar";


export default function dashboard({member}: Member) {
  return (
    <>
    <Navbar member={member}/>
    </>
  );
};

export async function getServerSideProps(context: any) {
   return "uwu";
}