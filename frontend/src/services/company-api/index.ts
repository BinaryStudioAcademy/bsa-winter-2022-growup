import { ICompany } from 'common/interfaces/company/company';
import { Http } from 'services/http/http.service';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';

interface IReturnCompanyData {
  token: string;
  company: ICompany;
}

interface IReturnCompaniesData {
  token: string;
  companies: ICompany[];
}

class CompanyApi {
  // eslint-disable-next-line
  private http: Http;
  private apiPath: string;

  constructor({ apiPath, http }: { apiPath: string; http: Http }) {
    this.apiPath = apiPath;
    this.http = http;
  }

  public async getAllCompamies(): Promise<IReturnCompaniesData | null> {
    const options = {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
      hasAuth: true,
      payload: null,
    };

    try {
      const result = await this.http.load<IReturnCompaniesData>(
        `${this.apiPath}/company`,
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async addCompany(
    company: ICompany,
  ): Promise<IReturnCompanyData | null> {
    const options = {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(company),
    };

    try {
      const result = await this.http.load<IReturnCompanyData>(
        `${this.apiPath}/company`,
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async editCompany(
    company: ICompany,
  ): Promise<IReturnCompanyData | null> {
    const { id } = company;
    delete company.id;

    const options = {
      method: HttpMethod.PATCH,
      contentType: ContentType.JSON,
      payload: JSON.stringify(company),
    };

    try {
      const result = await this.http.load<IReturnCompanyData>(
        `${this.apiPath}/company/${id}`,
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }
}

export { CompanyApi };
