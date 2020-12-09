import { Component, OnInit } from '@angular/core';
import { Manifestation } from '../_models/manifestation';
import { ManifestService } from '../_services/manifest.service';
import { ManifestationParams } from '../_models/manifestationParams';

@Component({
  selector: 'app-manifestations-list',
  templateUrl: './manifestations-list.component.html',
  styleUrls: ['./manifestations-list.component.css'],
})
export class ManifestationsListComponent implements OnInit {
  manifestations: Manifestation[];
  manifestParams: ManifestationParams = new ManifestationParams();
  startingDate: Date;
  constructor(private manifestationService: ManifestService) {}

  ngOnInit() {
    this.manifestationService.getAllManifestations().subscribe((res) => {
      console.log(res);
      this.manifestations = res;
    });
  }
  onNameSort() {
    this.manifestations.sort((a, b) => a.name.localeCompare(b.name));
  }

  onSortLocation() {
    this.manifestations.sort((a, b) =>
      a.place.city.localeCompare(b.place.city)
    );
  }
  onPriceSort() {
    this.manifestations.sort((a, b) => (a.price > b.price ? 1 : -1));
  }
  removeFilters() {
    this.manifestParams = new ManifestationParams();
    this.manifestationService
      .getAllManifestations(this.manifestParams)
      .subscribe((res) => {
        this.manifestations = res;
      });
  }

  onDateSort() {
    this.manifestations.sort((a, b) =>
      new Date(b.eventDate).getTime() > new Date(a.eventDate).getTime() ? 1 : -1
    );
  }

  loadManifestations() {
    this.manifestationService
      .getAllManifestations(this.manifestParams)
      .subscribe((res) => {
        this.manifestations = res;
      });
  }

  resetFilters() {}
}
