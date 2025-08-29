import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { CategoryScale, Chart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { provideCharts } from 'ng2-charts';

Chart.register(LineController, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
  providers: [
    provideCharts() // Add ng2-charts provider
  ]
}).catch(err => console.error(err));
