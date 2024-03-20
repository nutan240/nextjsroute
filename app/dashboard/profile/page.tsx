import type { NextPage } from "next";

const waitFor = (sec: number) => new Promise((res) => setTimeout(res, sec * 1000));

const DashboardPage: NextPage = async () => {
    await waitFor(6);
    return (
        <div className="text-2xl font-bold px-7 py-10">
            Profile page
        </div>
    );
};

export default DashboardPage;
