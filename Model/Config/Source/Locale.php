<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Esparksinc\IvyPayment\Model\Config\Source;

/**
 * @api
 * @since 100.0.2
 */
class Locale implements \Magento\Framework\Option\ArrayInterface
{
    /**
     * Options getter
     *
     * @return array
     */
    public function toOptionArray()
    {
        return [['value' => 'en', 'label' => __('EN')], ['value' => 'de', 'label' => __('DE')]];
    }

    /**
     * Get options in "key-value" format
     *
     * @return array
     */
    public function toArray()
    {
        return ['en' => __('EN'), 'de' => __('DE')];
    }
}
