import { Component, Input } from "@angular/core";
@Component({
  selector: "app-sponsor-card",
  templateUrl: "./sponsor-card.component.html",
  styleUrls: ["./sponsor-card.component.scss"]
})
export class SponsorCardComponent {
  @Input() sponsor: any;
}
