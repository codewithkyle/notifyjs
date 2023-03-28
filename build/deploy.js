import ghPages from "gh-pages";

const NAME = "Kyle Andrews";
const EMAIL = "codingwithkyle@gmail.com";
const USERNAME = "codewithkyle";
const PROJECT = "notifyjs";

ghPages.publish(
    "test",
    {
        user: {
            name: NAME,
            email: EMAIL,
        },
        repo: "https://" + process.env.ACCESS_TOKEN + "@github.com/" + USERNAME + "/" + PROJECT + ".git",
        silent: true,
    },
    (error) => {
        if (error) {
            console.log(error);
        }
    }
);
