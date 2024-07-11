import { PropertyCategories, PropertyStatus, PropertyType } from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyType?: PropertyType;
	propertyStatus?: PropertyStatus;
	propertyCategories?: PropertyCategories;
	propertyAddress?: string;
	propertyTitle?: string;
	propertyPrice?: number;
	propertyDiscountPrice?: number;
	propertyImages?: string[];
	propertyDesc?: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
