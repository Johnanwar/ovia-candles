/**
 * Checkout Form Component
 * Form for collecting customer information and address
 */
'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/common';
import { Address } from '@/types';

interface CheckoutFormProps {
  locale: string;
  onSubmit: (data: CheckoutFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  mobile: string;
  address: Address;
}

export const CheckoutForm = ({ locale, onSubmit, isSubmitting = false }: CheckoutFormProps) => {
  const t = useTranslations('checkout');
  const isRTL = locale === 'ar';

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    mobile: '',
    address: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
    },
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData | keyof Address, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData | keyof Address, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('required');
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = t('required');
    } else {
      const mobileDigits = formData.mobile.replace(/\D/g, '');
      if (!/^(01[0125]\d{8})$/.test(mobileDigits)) {
        newErrors.mobile = t('invalidMobile');
      }
    }

    if (!formData.address.address1.trim()) {
      newErrors.address1 = t('required');
    }

    if (!formData.address.city.trim()) {
      newErrors.city = t('required');
    }

    if (!formData.address.state.trim()) {
      newErrors.state = t('required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    await onSubmit(formData);
  };

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-[var(--color-background-secondary)] rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
          {t('customerInfo')}
        </h3>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              {t('name')} <span className="text-[var(--color-error)]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={t('namePlaceholder')}
              className={`w-full px-4 py-2 border rounded-lg bg-[var(--color-background)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                errors.name ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder={t('emailPlaceholder')}
              className={`w-full px-4 py-2 border rounded-lg bg-[var(--color-background)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                errors.email ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.email}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              {t('mobile')} <span className="text-[var(--color-error)]">*</span>
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              placeholder={t('mobilePlaceholder')}
              className={`w-full px-4 py-2 border rounded-lg bg-[var(--color-background)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                errors.mobile ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
              }`}
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.mobile}</p>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-[var(--color-background-secondary)] rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
          {t('address')}
        </h3>

        <div className="space-y-4">
          {/* Address Line 1 */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              {t('addressLine1')} <span className="text-[var(--color-error)]">*</span>
            </label>
            <input
              type="text"
              value={formData.address.address1}
              onChange={(e) => handleAddressChange('address1', e.target.value)}
              placeholder={t('addressLine1Placeholder')}
              className={`w-full px-4 py-2 border rounded-lg bg-[var(--color-background)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                errors.address1 ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
              }`}
            />
            {errors.address1 && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.address1}</p>
            )}
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              {t('addressLine2')}
            </label>
            <input
              type="text"
              value={formData.address.address2}
              onChange={(e) => handleAddressChange('address2', e.target.value)}
              placeholder={t('addressLine2Placeholder')}
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>

          {/* City, State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                {t('city')} <span className="text-[var(--color-error)]">*</span>
              </label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                placeholder={t('cityPlaceholder')}
                className={`w-full px-4 py-2 border rounded-lg bg-[var(--color-background)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  errors.city ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                }`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-[var(--color-error)]">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                {t('state')} <span className="text-[var(--color-error)]">*</span>
              </label>
              <input
                type="text"
                value={formData.address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                placeholder={t('statePlaceholder')}
                className={`w-full px-4 py-2 border rounded-lg bg-[var(--color-background)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  errors.state ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                }`}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-[var(--color-error)]">{errors.state}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('placingOrder')}
          </div>
        ) : (
          t('confirmOrder')
        )}
      </Button>
    </form>
  );
};

