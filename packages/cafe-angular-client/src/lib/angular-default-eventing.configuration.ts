import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CafeEnvironmentService} from '@cafe/cafe-environment';
import {ClientEventing} from '@cafe/cafe-model';
import {Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {
  AngularEventingOptions,
  CAFE_ERROR_LOGGING_API_KEY,
  CAFE_EVENTING_ENDPOINT,
  UrlSource
} from './angular-default-eventing.interface';

import { EventingConfiguration, RequiredEventingOptions } from '@cafe/cafe';

export class AngularDefaultEventingConfiguration implements EventingConfiguration, RequiredEventingOptions {

  constructor(
    private options: AngularEventingOptions,
    private httpClient: HttpClient,
    private router: Router,
    private environmentService: CafeEnvironmentService,
  ) {
  }

  get productEnvironment(): ClientEventing.Environment {
    return this.options.productEnvironment || this.environmentService.environmentName as ClientEventing.Environment;
  }

  get productPlatform(): ClientEventing.ProductPlatform {
    return this.options.productPlatform;
  }

  get eventingEndpoint(): string {
    return this.options.eventingEndpoint || this.environmentService.getEnvironmentSetting(CAFE_EVENTING_ENDPOINT);
  }

  get apiKey(): string {
    return this.options.apiKey || this.environmentService.getEnvironmentSetting(CAFE_ERROR_LOGGING_API_KEY);
  }

  get bufferInterval(): number {
    return this.options.bufferInterval;
  }

  get maxBufferSize(): number {
    return this.options.maxBufferSize;
  }

  get profileSubmissionDelay(): number {
    return this.options.profileSubmissionDelay;
  }

  get useNativeResolution(): boolean {
    return this.options.useNativeResolution;
  }

  get useBrowserGeoLocation(): boolean {
    return this.options.useBrowserGeoLocation;
  }

  get fetchIpAddress(): boolean {
    return this.options.fetchIpAddress;
  }

  get recordViewingTime(): boolean {
    return this.options.recordViewingTime;
  }

  get recordViewingTimeWhenWindowNotVisible(): boolean {
    return this.options.recordViewingTimeWhenWindowNotVisible;
  }

  get recordViewingTimeByUrl(): boolean {
    return this.options.recordViewingTimeByUrl;
  }

  get recordViewingTimeContiguously(): boolean {
    return this.options.recordViewingTimeContiguously;
  }

  get viewingTimeCheckInterval(): number {
    return this.options.viewingTimeCheckInterval;
  }

  get viewingTimeRecordInterval(): number {
    return this.options.viewingTimeRecordInterval;
  }

  get viewingTimeRecordCategory(): string {
    return this.options.viewingTimeRecordCategory;
  }

  get attemptCompletionOnClose(): boolean {
    return this.options.attemptCompletionOnClose;
  }

  get installOnUnloadHandler(): boolean {
    return this.options.installOnUnloadHandler;
  }

  get installOnErrorHandler(): boolean {
    return this.options.installOnErrorHandler;
  }

  get logErrorsToService(): boolean {
    return this.options.logErrorsToService;
  }

  get urlScrubber(): (string) => string {
    return this.options.urlScrubber;
  }

  get hostPlatform(): ClientEventing.ProductPlatform {
    return this.options.hostPlatform;
  }

  get hostEnvironment(): ClientEventing.Environment {
    return this.options.hostEnvironment;
  }

  get userPlatform(): ClientEventing.UserPlatform {
    return this.options.userPlatform;
  }

  get userEnvironment(): ClientEventing.Environment {
    return this.options.userEnvironment;
  }

  get urlProvider(): () => string {
    return this.options.urlProvider;
  }

  getIpAddress(endpoint: string): Observable<ClientEventing.Ip> {
    return this.httpClient.get<ClientEventing.Ip>(`${this.eventingEndpoint}/ip`, {headers: {'x-api-key': this.apiKey}});
  }

  sendLogRecords(endpoint: string, logRecords: ClientEventing.LogRecords): Observable<ClientEventing.SubmissionResponse> {
    return this.post(endpoint, logRecords, {'x-api-key': this.apiKey});
  }

  sendProfileRecords(endpoint: string, profileRecords: ClientEventing.ProfileRecords): Observable<ClientEventing.SubmissionResponse> {
    return this.post(endpoint, profileRecords, {'x-api-key': this.apiKey});
  }

  sendActivityRecords(endpoint: string, activityRecords: ClientEventing.ActivityRecords): Observable<ClientEventing.SubmissionResponse> {
    return this.post(endpoint, activityRecords, {'x-api-key': this.apiKey});
  }

  currentUrl(): string {
    if (this.options.urlSource === UrlSource.ROUTER_URL) {
      return this.router.url;
    }
    return window.location.href;
  }

  // noinspection JSMethodCanBeStatic
  uuid(): string {
    return uuidv4();
  }

  private post<T>(endpoint: string, body: any, headers: { [s: string]: string } = {}): Observable<T> {
    return this.httpClient.post<T>(
      endpoint,
      body,
      {
        headers: headers
      }
    );
  }

}