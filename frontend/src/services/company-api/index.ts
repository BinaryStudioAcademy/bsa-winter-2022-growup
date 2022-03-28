import { ICompany } from 'common/interfaces/company/company';
import { IAuthApi } from 'common/interfaces/api';
import { Http } from '../http/http.service';
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

  constructor({ apiPath, http }: IAuthApi) {
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

  updateCompanyAvatar(image: Blob): Promise<ICompany> {
    const formData = new FormData();
    formData.append('avatar', image);

    return this.http.load(`${this.apiPath}/company/avatar`, {
      method: HttpMethod.PUT,
      contentType: ContentType.MULTIPART_FORM_DATA,
      hasAuth: true,
      payload: formData,
    });
  }
}

export { CompanyApi };
