import { PropertyCategories, PropertyStatus, PropertyType } from '../../enums/property.enum';
import { Direction } from '../../enums/common.enum';

export interface PropertyInput {
	propertyType: PropertyType;
	propertyCategories: PropertyCategories;
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertyDiscountPrice: number;
	propertyImages: string[];
	propertyDesc?: string;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	categoryList?: PropertyCategories[];
	typeList?: PropertyType[];
	options?: string[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	discountRange?: Range;
	text?: string;
}

export interface PropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	propertyStatus?: PropertyStatus;
}

export interface AgentPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	propertyStatus?: PropertyStatus;
	propertyCategoryList?: PropertyCategories[];
}

export interface AllPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
