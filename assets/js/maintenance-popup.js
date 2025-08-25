// Maintenance popup warning for site changes
(function () {
  "use strict";

  // Check if popup has already been shown in this session
  if (sessionStorage.getItem("maintenancePopupShown")) {
    return;
  }

  // Create popup HTML
  const popupHTML = `
        <div id="maintenance-popup" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Montserrat', sans-serif;
        ">
            <div style="
                background-color: #fff;
                border-radius: 15px;
                padding: 2rem;
                max-width: 500px;
                margin: 1rem;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                color: #333;
                position: relative;
            ">
                <h2 style="
                    color: #ff6b6b;
                    margin-top: 0;
                    font-size: 1.5rem;
                    font-weight: 700;
                ">⚠️ Important Notice</h2>
                
                <p style="
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin: 1.5rem 0;
                    color: #555;
                ">
                    We're making changes to the site that may cause DuckMath to get b10cked at your school or workplace.
                </p>
                
                <p style="
                    font-size: 1rem;
                    line-height: 1.6;
                    margin: 1.5rem 0;
                    color: #555;
                ">
                    <strong>We want you to stay! So just in case:</strong><br>
                    Join our D1sc0rd community to get backup l1nks and stay updated on new mirr0r sites.
                </p>
                
                <div style="
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 2rem;
                    flex-wrap: wrap;
                ">
                    <a href="https://discord.gg/aMUVSARrEy" target="_blank" style="
                        background-color: #5865F2;
                        color: white;
                        padding: 0.8rem 1.5rem;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        display: inline-block;
                    " onmouseover="this.style.backgroundColor='#4752C4'" onmouseout="this.style.backgroundColor='#5865F2'">
                        🔗 Join D1sc0rd
                    </a>
                    
                    <button onclick="closeMaintenancePopup()" style="
                        background-color: #6c757d;
                        color: white;
                        padding: 0.8rem 1.5rem;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: inherit;
                    " onmouseover="this.style.backgroundColor='#5a6268'" onmouseout="this.style.backgroundColor='#6c757d'">
                        Continue Anyway
                    </button>
                </div>

                <p style="
                    font-size: 0.9rem;
                    margin-top: 1.5rem;
                    margin-bottom: 0;
                ">
                    If you dont want to join our D1sc0rd community, you can continue on the l1nk (duck.quackprep.com)
                </p>
                
                <p style="
                    font-size: 0.9rem;
                    color: #888;
                    margin-top: 1.5rem;
                    margin-bottom: 0;
                ">
                    This message will only show once per session.
                </p>
            </div>
        </div>
    `;

  // Function to close popup
  window.closeMaintenancePopup = function () {
    const popup = document.getElementById("maintenance-popup");
    if (popup) {
      popup.remove();
    }
    sessionStorage.setItem("maintenancePopupShown", "true");
  };

  // Show popup after page loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(() => {
        document.body.insertAdjacentHTML("beforeend", popupHTML);
      }, 1000); // Show after 1 second delay
    });
  } else {
    setTimeout(() => {
      document.body.insertAdjacentHTML("beforeend", popupHTML);
    }, 1000);
  }

  // Close popup when clicking outside
  document.addEventListener("click", function (e) {
    const popup = document.getElementById("maintenance-popup");
    if (popup && e.target === popup) {
      closeMaintenancePopup();
    }
  });

  // Close popup with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMaintenancePopup();
    }
  });
})();
