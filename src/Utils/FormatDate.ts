export default function FormatDate(dateString: string): { date: string; timeAgo: string } {
    const inputDate = new Date(dateString);
    const now = new Date();

    // Format the date as YYYY/MM/DD
    const formattedDate: string = `${inputDate.getFullYear()}/${(inputDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${inputDate.getDate().toString().padStart(2, "0")}`;

    // Calculate the difference in seconds
    const differenceInSeconds: number = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

    let timeAgo: string = "";

    if (differenceInSeconds < 60) {
        timeAgo = `${differenceInSeconds} sec${differenceInSeconds === 1 ? "" : "s"} ago`;
    } else if (differenceInSeconds < 3600) {
        const minutes: number = Math.floor(differenceInSeconds / 60);
        timeAgo = `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (differenceInSeconds < 86400) {
        const hours: number = Math.floor(differenceInSeconds / 3600);
        timeAgo = `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (differenceInSeconds < 2592000) {
        const days: number = Math.floor(differenceInSeconds / 86400);
        timeAgo = `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (differenceInSeconds < 31536000) {
        const months: number = Math.floor(differenceInSeconds / 2592000);
        timeAgo = `${months} month${months === 1 ? "" : "s"} ago`;
    } else {
        const years: number = Math.floor(differenceInSeconds / 31536000);
        timeAgo = `${years} year${years === 1 ? "" : "s"} ago`;
    }

    return {
        date: formattedDate,
        timeAgo,
    };
}