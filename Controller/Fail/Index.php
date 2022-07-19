<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Esparksinc\IvyPayment\Controller\Fail;

use Magento\Framework\App\RequestInterface;

/**
 * Billing agreements controller
 */
class Index extends \Magento\Framework\App\Action\Action
{
    protected $orderManagement;
    /**
     * @param \Magento\Framework\App\Action\Context $context
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Sales\Api\OrderManagementInterface $orderManagement
    ) {
        $this->orderManagement = $orderManagement;
        parent::__construct($context);
    }

    public function execute()
    {
        // Get success params from Ivy
        $magentoOrderId = $this->getRequest()->getParam('reference');
        $this->orderManagement->cancel($magentoOrderId);
        $this->messageManager->addErrorMessage(__('Sorry, but something went wrong during payment process'));
        // $this->_redirect('checkout', ['_fragment' => 'payment']);
        $this->_redirect('checkout/cart');
    }
}
