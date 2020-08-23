import React from "react";

export default function Footer() {
  return (
    <footer class="new_footer_area bg_color">
      <div class="new_footer_top">
        <div class="footer_bg">
          <div class="footer_bg_one"></div>
          <div class="footer_bg_two"></div>
        </div>
      </div>
      <div class="footer_bottom">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-sm-7" style={{ textAlign: "right" }}>
              <p class="mb-0 f_400">
                Copied With <i class="icon_heart"></i> <a href="#"> Love :)</a>{" "}
                © No rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
