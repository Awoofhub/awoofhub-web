import { useManageSubscription } from '@/features/subscription/useManageSubscription';
import { Subscription } from '@/types/subscription';
import { formatDateShortMonth } from '@/utils/formatDate';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { PiCrown } from 'react-icons/pi';
import PlanBenefits from './SubscriptionPlanBenefits';
import { SUBSCRIPTION_PLANS } from './SubscriptionPlanList';

interface Props {
    subscription: Subscription
}

export default function SubscriptionDashboard({ subscription }: Props) {

    const { manage, isLoading } = useManageSubscription();

    const planName = subscription.user.subscriptionPlan;

    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planName);

    if (!plan) {
        return null;
    }

    const expiresAt = addDays(new Date(subscription.createdAt), 30);
    const daysLeft = differenceInCalendarDays(expiresAt, new Date());

    return (
        <div className="text-gray-800 mt-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">

                {/* Header + subscription card */}
                <div className="md:col-span-2 space-y-6">

                    <div className="flex items-start xs:items-center gap-3 md:gap-4">
                        <div className="bg-primary rounded-full flex justify-center items-center shrink-0 w-[60px] h-[60px] xs:w-[90px] xs:h-[90px] text-3xl xs:text-5xl">
                            <PiCrown className="text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] xs:text-xs lg:text-sm font-semibold text-primary uppercase mb-1">
                                Your Subscription
                            </p>
                            <h1 className="text-xl xs:text-2xl lg:text-3xl font-semibold text-gray-900">
                                {plan.title} Plan
                            </h1>
                            <p className="text-sm xs:text-base lg:text-lg text-muted mt-1">
                                You’re on AwoofHub’s {plan.title} package. Enjoy more visibility, more features and bigger opportunities to grow your business.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-primary rounded-xl p-4 xs:p-6">
                        <div className="flex grid grid-cols-1 lg:grid-cols-2">
                            <div className="space-y-3">
                                <span className="inline-flex font-baloo items-center px-6 py-1.5 rounded-xl text-sm font-medium bg-[#20B5261A] text-[#006400]">
                                    <CircleCheckBig className="w-3.5 h-3.5 mr-1" /> Active
                                </span>
                                <div>
                                    <p className=" font-medium text-sm text-muted mb-1">Subscription ends</p>
                                    <div className="flex flex-wrap items-center font-baloo text-gray-900 font-semibold text-2xl">
                                        <CalendarDays className="w-5 h-5 text-primary mr-2" />
                                        {formatDateShortMonth(expiresAt.toISOString())}
                                        {daysLeft >= 0 && (
                                            <span className="ml-2 text-base font-normal text-primary">
                                                (in {daysLeft} {daysLeft === 1 ? 'day' : 'days'})
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <hr className="lg:hidden border-muted/20 my-3" />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-3 lg:border-l lg:border-muted/20 lg:pl-12">
                                <div className="space-y-1">
                                    <span className="text-base text-muted">Plan</span>
                                    <div className="flex items-start gap-2">
                                        <h3 className="text-2xl font-semibold text-gray-900">{plan.title} Plan</h3>
                                        <p className="bg-[#FE4F041A] font-baloo text-primary text-sm font-medium px-2 py-0.5 rounded-xl">
                                            Monthly
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-base text-muted">Amount</p>
                                    <p className="text-2xl font-semibold font-baloo text-gray-900">
                                        {`N ${(subscription.amount / 100).toLocaleString()}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right sidebar: below features on mobile, beside the header from md up */}
                <div className="order-last md:order-none lg:row-span-2 space-y-3 lg:space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6">
                        <h3 className="text-lg lg:text-2xl font-semibold text-gray-900 mb-2">Manage your subscription</h3>
                        <p className="text-xs xs:text-sm lg:text-base text-gray-900 leading-relaxed mb-4 lg:mb-6">
                            Update your payment method, view billing history or cancel your subscription.
                        </p>
                        <button
                            onClick={() => manage()}
                            disabled={isLoading}
                            className="w-full bg-primary text-white font-baloo font-semibold text-sm xs:text-base py-2 px-4 rounded-md hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer transition">
                            {isLoading ? "Loading..." : "Manage Subscription"}
                        </button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 [lg:p-6">
                        <h3 className="text-lg xs:text-xl font-semibold text-gray-900 mb-2">Questions?</h3>
                        <p className="text-xs xs:text-sm lg:text-base text-gray-900 leading-relaxed mb-4 lg:mb-6">
                            Check our help center for more details about your subscription.
                        </p>
                        <Link href="/help" className="flex items-center justify-center text-xs xs:text-sm font-bold text-primary hover:opacity-80 transition">
                            Visit Help Center <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                    </div>
                </div>

                {/* Features: full width on tab, under the subscription card on desktop */}
                <div className="md:col-span-3 lg:col-span-2">
                    <PlanBenefits
                        heading="Features:"
                        title={plan.title}
                        features={plan.features}
                        unavailableFeatures={plan.unavailableFeatures}
                        listClassName="grid-cols-1 md:grid-cols-2"
                    />
                </div>

            </div>

        </div>

    );
};