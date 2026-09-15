import MyOfferListItemSkeleton from "./MyOfferListItemSkeleton";

export default function BoostPlanListSkeleton() {
	return (
		<div className="animate-pulse">
			<div className="mb-6">
				<MyOfferListItemSkeleton number={1} />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
				{[...Array(3)].map((_, index) => (
					<div
						key={index}
						className="bg-white rounded-xl p-5 border mt-6 border-gray-200 flex flex-col justify-between"
					>
						<div className="flex items-center space-x-2.5 mb-3">
							<div className="h-4 w-4 rounded-full bg-gray-200" />
							<div className="h-4 w-20 rounded bg-gray-200" />
						</div>

						<div className="h-3 w-3/4 rounded bg-gray-200 mb-4" />
						<div className="h-6 w-28 rounded bg-gray-200 mb-3" />

						<div className="space-y-2.5">
							{[...Array(3)].map((__, featureIndex) => (
								<div key={featureIndex} className="flex items-center">
									<div className="h-3.5 w-3.5 rounded-full bg-gray-200 mr-2 shrink-0" />
									<div className="h-3 w-4/5 rounded bg-gray-200" />
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="bg-gray-100 p-4 flex items-center justify-between gap-4 mt-5">
				<div>
					<div className="h-3 w-20 rounded bg-gray-200 mb-2" />
					<div className="h-6 w-24 rounded bg-gray-200" />
				</div>

				<div className="h-10 w-full max-w-[280px] rounded-sm bg-gray-200" />
			</div>
		</div>
	);
}
